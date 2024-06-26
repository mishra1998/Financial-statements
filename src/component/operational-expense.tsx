import React, { useState, ChangeEvent } from "react";
import "./table.css";

interface Expense {
  id: number;
  description: string;
  year1: number;
  year2: number;
}

const OPTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Fuel", year1: 4357, year2: 14333 },
    { id: 2, description: "Labour", year1: 35814, year2: 30554 },
    { id: 3, description: "Landing Fees and Route Charges", year1: 5416, year2: 6149 },
    { id: 4, description: "Maintenance, Materials", year1: 5416, year2: 6149 },
  ]);
  const [newRow, setNewRow] = useState<Partial<Expense>>({ description: "", year1: 0, year2: 0 });
  const [showAddRowForm, setShowAddRowForm] = useState(false);

  const toggleAddRowForm = () => {
    setShowAddRowForm(!showAddRowForm);
  };

  const handleNewRowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: name === "description" ? value : parseInt(value) });
  };

  const addRow = () => {
    const id = expenses.length + 1;
    const newRowData = { id, description: newRow.description || "", year1: newRow.year1 || 0, year2: newRow.year2 || 0 };
    setExpenses([...expenses, newRowData]);
    setNewRow({ description: "", year1: 0, year2: 0 });
    setShowAddRowForm(false);
  };

  const totalYear1 = expenses.reduce((acc, expense) => acc + (expense.year1 || 0), 0);
  const totalYear2 = expenses.reduce((acc, expense) => acc + (expense.year2 || 0), 0);

  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Operational Expenses</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={{ width: "200px" }}>{expense.description}</td>
              <td>{expense.year1}</td>
              <td>{expense.year2}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
          <tr className="total-row">
            <td style={{ width: "200px" }}>Total</td>
            <td>{totalYear1}</td>
            <td>{totalYear2}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {!showAddRowForm && <button onClick={toggleAddRowForm}>Add Row</button>}
      {showAddRowForm && (
        <div>
          <label>Description:</label>{" "}
          <input
            type="text"
            name="description"
            value={newRow.description}
            onChange={handleNewRowChange}
          />
          <label>Year 2021:</label>{" "}
          <input
            type="number"
            name="year1"
            value={newRow.year1 || ""}
            onChange={handleNewRowChange}
          />
          <label>Year 2022:</label>{" "}
          <input
            type="number"
            name="year2"
            value={newRow.year2 || ""}
            onChange={handleNewRowChange}
          />
          <button onClick={addRow}>Add</button>
          <button onClick={toggleAddRowForm}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default OPTable;
