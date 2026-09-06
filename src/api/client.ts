import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { Platform } from "react-native";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiError extends Error {
  status?: number;
  data?: any;
}

export interface RequestOptions<TBody = any> {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  tokenOverride?: string | null;
  params?: Record<string, any>;
  timeoutMs?: number;
  baseURL?: string;
  signal?: AbortSignal;
}

export const BASE_URL = Platform.select({
  android: "http://10.0.2.2:4000",
  default: "http://localhost:4000",
});

export const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    const wrapped: ApiError = new Error(
      err.response?.data
        ? (err.response.data?.error as any)?.message
        : err?.message,
    );
    wrapped.status = err.response?.status;
    wrapped.data = err.response?.data;
    if (__DEV__) {
      console.log("Api axios error: ", wrapped);
    }
    return wrapped;
  }
  if (__DEV__) {
    console.log("Api error: ", error);
  }
  return error as ApiError;
};

/**
 *
 * @param options
 * @returns
 */
export const apiFetch = async <TResponse = any, TBody = any>(
  options: RequestOptions<TBody>,
): Promise<TResponse> => {
  const {
    path,
    method = "GET",
    body,
    headers = {},
    tokenOverride,
    params,
    timeoutMs,
    baseURL,
    signal,
  } = options;

  const config: AxiosRequestConfig = {
    url: path,
    method,
    headers: { ...headers },
    params,
    timeout: timeoutMs,
    data: body,
  };

  if (baseURL) {
    config.baseURL = baseURL;
  }

  // If tokenOverride provided, set it explicitly on headers
  if (tokenOverride) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${tokenOverride}`;
  }

  if (signal) {
    config.signal = signal;
  }

  try {
    const res = await client.request<TResponse>(config);
    return res.data;
  } catch (error) {
    throw toApiError(error);
  }
};
