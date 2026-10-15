import type { ServiceError, ServiceSuccess } from '../services/global.types';

type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;
export type ServiceResponseWithoutData = { success: true } | ServiceError;

export type ProviderProps = {
  children: React.ReactNode;
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
}

export interface CrudService<TItems, TItem, TFormData> {
  get: (pageCurrent: number) => Promise<ServiceResponse<PageResponse<TItems>>>;
  getById: (id: number) => Promise<ServiceResponse<TItem>>;
  add: (data: TFormData) => Promise<ServiceResponseWithoutData>;
  put: (id: number, data: TFormData) => Promise<ServiceResponseWithoutData>;
  del: (id: number) => Promise<ServiceResponseWithoutData>;
}