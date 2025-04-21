export type ErrorResponseType = {
  message: string;
}

export type ApiResponseType<R> ={
  isError: boolean
  data: R
}
