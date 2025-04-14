// components/ExpenseForm.jsx
import { useState } from 'react';

export default function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    amount: '',
    date: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    onAddExpense(newExpense);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      amount: '',
      date: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter expense description"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter expense category"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}