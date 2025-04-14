import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Pilau", description: "Monday's Lunch", category: "Food", amount: 200, date: "2025-04-14" },
    { id: 2, name: "KPLC tokens", description: "Power tokens", category: "Utilities", amount: 300, date: "2025-04-14" },
    { id: 3, name: "Buy Shoe", description: "Add to my shoe collection", category: "Personal", amount: 2500, date: "2025-04-14" },
    { id: 4, name: "Buy Novel", description: "Add to my novel collection", category: "General", amount: 120, date: "2025-04-14" },
    { id: 5, name: "Pay Loan", description: "Bank loan repayment", category: "Finance", amount: 500, date: "2025-04-14" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const addExpense = (newExpense) => {
    setExpenses([...expenses, {
      ...newExpense,
      id: expenses.length + 1
    }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = String(a[sortConfig.key]).toLowerCase();
      const bValue = String(b[sortConfig.key]).toLowerCase();
      
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

  const filteredExpenses = sortedExpenses.filter(expense => {
    return expense.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           expense.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="app-header">
          <h1>Expense Tracker</h1>
          <p>Start taking control of your finances and life. Record, categorize and analyze your spending</p>
        </div>
        
        <div className="app-content">
          <div className="expense-form-container">
            <h2>Add Expense</h2>
            <p>Enter your expense details below</p>
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          
          <div className="expenses-right-section">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="expenses-table-container">
              <ExpenseTable 
                expenses={filteredExpenses} 
                onDelete={deleteExpense} 
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}