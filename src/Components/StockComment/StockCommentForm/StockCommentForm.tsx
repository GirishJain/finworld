import { SyntheticEvent, useEffect, useRef } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReset } from "react-hook-form";
import { StockCommentVar } from "../../../Models/CommentPost";

type Props = {
  stockComment: StockCommentVar;
  handleCommentPost: (e: CommentFormInputs) => void;
  formInput?: CommentFormInputs;
  handleEditMode?: () => void;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const StockCommentForm = ({
  stockComment,
  handleCommentPost,
  formInput,
  handleEditMode,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CommentFormInputs>({ resolver: yupResolver(validation) });

  useEffect(() => {
    if (stockComment) {
      setValue("title", stockComment.title);
      setValue("content", stockComment.content);
    }
  }, [stockComment]);

  const timerRef = useRef<number | null>(null);

  const onReset = (): void => {
    handleEditMode && handleEditMode();
    reset();
  };

  const onSubmit = (data: CommentFormInputs) => {
    handleCommentPost(data);
    timerRef.current = window.setTimeout(() => {
      reset();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, 2000);
  };

  return (
    <form className="mt-4 ml-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
        {...register("title")}
      />
      {errors.title ? <p className="text-white">{errors.title.message}</p> : ""}
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          {...register("content")}
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-sky-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 hover:opacity-80"
      >
        Post comment
      </button>
      &nbsp;
      <button
        type="button"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:opacity-80"
        onClick={onReset}
      >
        Cancel
      </button>
    </form>
  );
};

export default StockCommentForm;
