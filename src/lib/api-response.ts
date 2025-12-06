import { ApiError, ApiSuccess } from "../types/responses/generic-response";

export function ok<T>(data: T, message = "OK") {
  const body: ApiSuccess<T> = {
    success: true,
    message,
    data,
    errors: null,
  };

  return Response.json(body, { status: 200 });
}

export function created<T>(data: T, message = "Created") {
  const body: ApiSuccess<T> = {
    success: true,
    message,
    data,
    errors: null,
  };

  return Response.json(body, { status: 201 });
}

export function badRequest<E = unknown>(message = "Bad Request", errors: E) {
  const body: ApiError<E> = {
    success: false,
    message,
    data: null,
    errors: errors,
  };

  return Response.json(body, { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  const body: ApiError = {
    success: false,
    message,
    data: null,
    errors: null,
  };

  return Response.json(body, { status: 401 });
}

export function notFound(message = "Not Found") {
  const body: ApiError = {
    success: false,
    message,
    data: null,
    errors: null,
  };

  return Response.json(body, { status: 404 });
}

export function serverError(message = "Internal Server Error") {
  const body: ApiError = {
    success: false,
    message,
    data: null,
    errors: null,
  };

  return Response.json(body, { status: 500 });
}
