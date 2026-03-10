const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <>
      <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
        Anterior
      </button>

      <span>
        Página {page + 1} de {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Próxima
      </button>
    </>
  );
};

export default Pagination;