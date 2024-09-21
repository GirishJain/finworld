import React, { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import {
  commentDeleteAPI,
  commentGetAPI,
  commentPostAPI,
  commentPutAPI,
} from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet, StockCommentVar } from "../../Models/CommentPost";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const emptyStockCommentOjb: StockCommentVar = {
    symbol: stockSymbol,
    title: "",
    content: "",
  };

  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [stockCommentObj, setStockCommentObj] =
    useState<StockCommentVar>(emptyStockCommentOjb);

  useEffect(() => getComments(), [isEditMode]);

  const handleCommentPost = (e: CommentFormInputs) => {
    if (stockCommentObj && stockCommentObj.id && stockCommentObj.id > 0) {
      // Update
      commentPutAPI(stockCommentObj.id, e.title, e.content)
        .then((res) => {
          if (res) {
            toast.success("Comment updated successfully!");
            setStockCommentObj(emptyStockCommentOjb);
            getComments();
          }
        })
        .catch((e) => {
          toast.warning(e);
        });
    } else {
      //Insert
      commentPostAPI(e.title, e.content, stockSymbol)
        .then((res) => {
          if (res) {
            toast.success("Comment created successfully!");
            getComments();
          }
        })
        .catch((e) => {
          toast.warning(e);
        });
    }
  };

  const handleCommentDelete = (id: number) => {
    commentDeleteAPI(id)
      .then((res) => {
        if (res) {
          toast.success("Comment deleted successfully!");
          getComments();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const handleCommentEdit = (
    e: CommentFormInputs,
    id: number,
    setValue?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setStockCommentObj({
      ...stockCommentObj,
      id: id,
      title: e.title,
      content: e.content,
    });
    setValue && setValue(true);
  };

  const handleEditMode = () => {
    if (
      stockCommentObj &&
      (stockCommentObj.title !== "" || stockCommentObj.content !== "")
    ) {
      setStockCommentObj(emptyStockCommentOjb);
      setIsEditMode(!isEditMode);
    }
  };

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      setComment(res?.data!);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? (
        <Spinner />
      ) : (
        <StockCommentList
          comments={comments!}
          onCommentEdit={handleCommentEdit}
          onCommentDelete={handleCommentDelete}
        />
      )}
      <StockCommentForm
        stockComment={stockCommentObj}
        handleCommentPost={handleCommentPost}
        handleEditMode={handleEditMode}
      />
    </div>
  );
};

export default StockComment;
