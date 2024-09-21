export type CommentPost = {
  title: string;
  content: string;
};

export type CommentGet = {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdByUserId: string;
};

export type StockCommentVar = {
  id?: number;
  title: string;
  content: string;
  symbol: string;
};
