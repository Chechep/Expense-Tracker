import { useState } from 'react';

export default function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    onAddExpense(newExpense);
    
    setFormData({
      name: '',
      description: '',
      category: '',
      amount: '',
      date: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter expense description"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter expense category"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="form-control"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control date-input"
          required
        />
      </div>
      <button
        type="submit"
        className="submit-button"
      >
        Submit
      </button>
    </form>
  );
}