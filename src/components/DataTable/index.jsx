const DataTable = ({ data, columns, renderActions }) => {
  if (!data) return <p>Erro ao carregar dados.</p>;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header}>{col.header}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.header}>{item[col.accessor]}</td>
            ))}

            <td>{renderActions(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;