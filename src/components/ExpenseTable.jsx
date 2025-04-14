// components/ExpenseTable.jsx
export default function ExpenseTable({ expenses, onDelete, onSort, sortConfig }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2 text-left">
                <button 
                  className="text-white font-semibold flex items-center" 
                  onClick={() => onSort('name')}
                >
                  Name
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="p-2 text-left">
                <button 
                  className="text-white font-semibold flex items-center" 
                  onClick={() => onSort('description')}
                >
                  Description
                  {sortConfig.key === 'description' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="p-2 text-left">
                <button 
                  className="text-white font-semibold flex items-center" 
                  onClick={() => onSort('category')}
                >
                  Category
                  {sortConfig.key === 'category' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-2">{expense.name}</td>
                <td className="p-2">{expense.description}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2 text-right">${expense.amount.toFixed(2)}</td>
                <td className="p-2">{expense.date}</td>
                <td className="p-2">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }