export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  errors: null;
};

export type ApiError<E = unknown> = {
  success: false;
  message: string;
  data: null;
  errors: E;
};
