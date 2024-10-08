import axios from "axios";
import { CommentGet, CommentPost } from "../Models/CommentPost";
import { handleError } from "../Helpers/ErrorHandler";
import { SERVICE_URL_PROD, SERVICE_URL_LOCAL } from "../Helpers/Constants";

const api =
  (process.env.NODE_ENV == "production"
    ? SERVICE_URL_PROD
    : SERVICE_URL_LOCAL) + "comment/";

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentPutAPI = async (
  id: number,
  title: string,
  content: string
) => {
  try {
    const data = await axios.put<CommentPost>(api + `${id}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<CommentGet>(api + `${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
