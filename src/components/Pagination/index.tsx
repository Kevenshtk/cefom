import Button from '../Button';

import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="secondary"
        disabled={page === 0}
        onClick={() => setPage((p) => p - 1)}
      >
        Anterior
      </Button>

      <span className="text-sm font-medium text-text-secondary">
        Página {page + 1} de {totalPages}
      </span>

      <Button
        variant="secondary"
        disabled={page + 1 >= totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Próxima
      </Button>
    </div>
  );
};

export default Pagination;
