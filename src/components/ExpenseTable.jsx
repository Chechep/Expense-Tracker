export default function ExpenseTable({ expenses, onDelete, onSort, sortConfig }) {
    return (
      <table className="expenses-table">
        <thead>
          <tr>
            <th>
              <button
                onClick={() => onSort('name')}
                className="sort-button"
              >
                Expense
                {sortConfig.key === 'name' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </button>
            </th>
            <th>
              <button
                onClick={() => onSort('description')}
                className="sort-button"
              >
                Description
                {sortConfig.key === 'description' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </button>
            </th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>Ksh{expense.amount.toFixed(2)}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }