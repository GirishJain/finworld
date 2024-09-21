import React, { useEffect } from "react";
import { CommentGet } from "../../Models/CommentPost";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
  onCommentEdit?: (
    e: any,
    id: number,
    setValue?: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  onCommentDelete?: (id: number) => void;
};

const StockCommentList = ({
  comments,
  onCommentEdit,
  onCommentDelete,
}: Props) => {
  return (
    <>
      {comments
        ? comments.map((comment, i) => {
            return (
              <StockCommentListItem
                key={i}
                comment={comment}
                onCommentEdit={onCommentEdit}
                onCommentDelete={onCommentDelete}
              />
            );
          })
        : ""}
    </>
  );
};

export default StockCommentList;
