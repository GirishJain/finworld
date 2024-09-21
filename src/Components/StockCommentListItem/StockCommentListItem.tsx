import { CommentGet } from "../../Models/CommentPost";
import "./StockCommentListItem.css";
import { useAuth } from "../../Context/useAuth";
import { useState } from "react";

type Props = {
  comment: CommentGet;
  onCommentEdit?: (
    e: CommentFormInputs,
    id: number,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  onCommentDelete?: (id: number) => void;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockCommentListItem = ({
  comment,
  onCommentEdit,
  onCommentDelete,
}: Props) => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  return (
    <div
      className={
        "relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full border rounded-lg max-w-md shadow-lg " +
        (isEdit ? "bg-gray-100" : "bg-white")
      }
    >
      {user && user.userId === comment.createdByUserId && (
        <>
          <div
            className="edit-btn"
            title="Edit"
            onClick={() =>
              onCommentEdit &&
              onCommentEdit(
                { title: comment.title, content: comment.content },
                comment.id,
                setIsEdit
              )
            }
          >
            <svg
              className={"h-5 w-5 text-sky-500" + (isEdit ? " hidden" : "")}
              width="24"
              height="24"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          <div
            className="delete-btn"
            title="Delete"
            onClick={() => {
              const userConfirmed = window.confirm(
                "Are you sure you want to delete this record?"
              );
              setConfirmed(userConfirmed);
              if (userConfirmed) {
                onCommentDelete && onCommentDelete(comment.id);
              } else {
                console.log("Deletion cancelled");
              }
            }}
          >
            <svg
              className={`text-red-500 w-6 h-6 rotate-[45deg] ${
                isEdit ? " hidden" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="7 7 10 10"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />{" "}
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />{" "}
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />{" "}
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />{" "}
              <line x1="9" y1="12" x2="15" y2="12" />{" "}
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
          </div>
        </>
      )}
      <div className="relative flex gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className=" relative text-xl whitespace-nowrap truncate overflow-hidden">
              {comment.title}
            </p>
          </div>
          <p className="text-dark text-sm">@{comment.createdBy}</p>
        </div>
      </div>
      <p className="-mt-4 text-gray-500">{comment.content}</p>
    </div>
  );
};

export default StockCommentListItem;
