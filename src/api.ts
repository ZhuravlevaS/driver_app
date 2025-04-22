import {ApiResponseType, ErrorResponseType} from "./types/apiTypes.ts";


const BASE_URL: string = "http://localhost:3001";

const rawRequest = async (
  url: string,
  config: RequestInit,
): Promise<Response> => {
  const headers: { [key: string]: string } = {};

  return fetch(`${BASE_URL}${url}`, {
    ...config,
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
      ...headers,
    },
  });
};

const makeRequest = async <R>(
  url: string,
  method = 'GET',
  body?: unknown,
): Promise<ApiResponseType<R>> => {
  const config: RequestInit = { method };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response: Response = await rawRequest(url, config);
  const responseJson = await response.json();
  const data: ApiResponseType<R> = {
    isError: !response.ok,
    data: responseJson
  }

  if (data.isError) {
    const error = responseJson as ErrorResponseType;
    console.error(error.message);
  }

  return data;
};

const get = <R>(url: string) => makeRequest<R>(url, 'GET');

const post = <R, B extends object>(url: string, body: B) =>
  makeRequest<R>(url, 'POST', body);

const put = <R, B extends object>(url: string, body?: B) =>
  makeRequest<R>(url, 'PUT', body);

const patch = <R, B extends object>(url: string, body: B) =>
  makeRequest<R>(url, 'PATCH', body);

const del = <R>(url: string) => makeRequest<R>(url, 'DELETE');

export const Api = { get, post, put, patch, del };
