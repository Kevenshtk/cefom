export interface ErrorResponse {
  message?: string;
}

export interface ServiceError {
  success: false;
  message: string;
}

export interface ServiceSuccess<T> {
  success: true;
  data: T;
}