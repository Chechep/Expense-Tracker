// App.jsx
import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';

export default function App() {
  // Sample initial expenses
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Legal Materials", description: "Wednesday's lunch", category: "food", amount: 20, date: "2023-04-05" },
    { id: 2, name: "Office Snacks", description: "Snack drawer", category: "office", amount: 35.00, date: "2023-03-15" },
    { id: 3, name: "Bus Ticket", description: "Visit to the shoe collection", category: "personal", amount: 12.00, date: "2023-04-02" },
    { id: 4, name: "Bus Ticket", description: "Visit to the book collection", category: "general", amount: 12.00, date: "2023-04-07" }
  ]);

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle form submission
  const addExpense = (newExpense) => {
    setExpenses([...expenses, {
      ...newExpense,
      id: expenses.length + 1
    }]);
  };

  // Handle delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key].toLowerCase();
      const bValue = b[sortConfig.key].toLowerCase();
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  // Filter expenses based on search term
  const filteredExpenses = sortedExpenses.filter(expense => {
    return expense.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           expense.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Expense Tracker</h1>
      <p className="text-gray-600 mb-6">Keep track of your expenses</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
          <ExpenseForm onAddExpense={addExpense} />
        </div>
        
        {/* Table Section */}
        <div className="w-full md:w-2/3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ExpenseTable 
            expenses={filteredExpenses} 
            onDelete={deleteExpense} 
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>
    </div>
  );
}