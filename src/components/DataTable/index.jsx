const DataTable = ({ data, columns, renderActions }) => {
  if (!data) return <p className="text-text-secondary py-4">Erro ao carregar dados.</p>;

  return (
    <div className="overflow-x-auto bg-surface shadow-sm rounded-lg border border-border">
      <table className="w-full text-left border-collapse">
        <thead className="bg-surface-2 text-text-secondary border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-6 py-4 font-medium text-sm">
                {col.header}
              </th>
            ))}
            <th className="px-6 py-4 font-medium text-sm text-right">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border text-text-primary">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-surface-2 transition-colors">
              {columns.map((col) => (
                <td key={col.header} className="px-6 py-4 whitespace-nowrap text-sm">
                  {item[col.accessor]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {renderActions(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;