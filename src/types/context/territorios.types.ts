import type { ServiceResponseWithoutData } from './global.types';

export interface TerritoriosContextType<TItems, TItem, TFormData> {
  items: TItems[];
  item: TItem | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  load: (pageCurrent: number) => Promise<void>;
  getById: (id: number) => Promise<void>;
  add: (data: TFormData) => Promise<boolean>;
  update: (id: number, data: TFormData) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  handleAction: (
    action: () => Promise<ServiceResponseWithoutData>,
    msg: string,
    onSuccess?: (page: number) => Promise<void>
  ) => Promise<boolean>;
  adicionarBairro: (id: number, bairro: string) => Promise<void>;
  deletarBairro: (id: number, bairro: string) => Promise<void>;
}
