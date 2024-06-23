import React, { useState } from "react";
import "./table.css";
import PlaneTable from "./plan-table";
import OPTable from "./operational-expense";

export const Table = () => {
  const [data, setData] = useState([
    {
      category: "Passenger",
      data2021: 4357,
      data2022: 14333,
      data2024: 15213,
      varience: 880,
      variencePer: 6.1,
    },
    {
      category: "Cargo",
      data2021: 35814,
      data2022: 30554,
      data2024: 29312,
      varience: -1242,
      variencePer: -4.1,
    },
    {
      category: "Catering",
      data2021: 5416,
      data2022: 6149,
      data2024: 5236,
      varience: -913,
      variencePer: -14.8,
    },
  ]);

  const [total, setTotal] = useState({
    data2021: 45587,
    data2022: 51036,
    data2024: 49761,
    varience: -1275,
    variencePer: -2.5,
  });

  const [newRow, setNewRow] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleVarience = (item, e) => {
    const newData2024 = Number(e.target.value);
    const newVarience = newData2024 - item.data2022;
    const newVariencePer = ((newVarience / item.data2022) * 100).toFixed(1);

    const updatedData = data.map((dataItem) => {
      if (dataItem.category === item.category) {
        return {
          ...dataItem,
          data2024: newData2024,
          varience: newVarience,
          variencePer: newVariencePer,
        };
      }
      return dataItem;
    });

    updateTotals(updatedData);
  };

  const updateTotals = (updatedData) => {
    const totalData2021 = updatedData.reduce((sum, curr) => sum + curr.data2021, 0);
    const totalData2022 = updatedData.reduce((sum, curr) => sum + curr.data2022, 0);
    const totalData2024 = updatedData.reduce((sum, curr) => sum + curr.data2024, 0);
    const totalVarience = totalData2024 - totalData2022;
    const totalVariencePer = ((totalVarience / totalData2022) * 100).toFixed(1);

    setData(updatedData);
    setTotal({
      data2021: totalData2021,
      data2022: totalData2022,
      data2024: totalData2024,
      varience: totalVarience,
      variencePer: totalVariencePer,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({
      ...newRow,
      [name]: value,
    });
  };

  const addRow = () => {
    if (newRow) {
      const updatedData = [
        ...data,
        {
          ...newRow,
          data2021: Number(newRow.data2021),
          data2022: Number(newRow.data2022),
          data2024: Number(newRow.data2024),
          varience: Number(newRow.data2024) - Number(newRow.data2022),
          variencePer: (((Number(newRow.data2024) - Number(newRow.data2022)) / Number(newRow.data2022)) * 100).toFixed(1),
        },
      ];
      updateTotals(updatedData);
      setNewRow(null);
    }
  };

  return (
    <>
    <div style={{border:"1px solid black"}}>
    <h3>Financial Statements</h3>
      <PlaneTable />
      <table style={{border:"1px solid black"}}>
        <thead>
          <tr>
            <th>REVENUE</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.category}>
              <td style={{ width: "200px" }}>{item.category}</td>
              <td>{item.data2021}</td>
              <td>{item.data2022}</td>
              <td>
                {editingItem === item.category ? (
                  <input
                    type="number"
                    defaultValue={item.data2024}
                    onChange={(e) => handleVarience(item, e)}
                    onBlur={() => setEditingItem(null)}
                    autoFocus
                  />
                ) : (
                  <span className="edit-icon" onClick={() => setEditingItem(item.category)}>
                    {item.data2024}
                  </span>
                )}
              </td>
              <td>{item.varience}</td>
              <td>{item.variencePer + "%"}</td>
            </tr>
          ))}
          <tr>
            <td style={{ width: "200px" }}>Total</td>
            <td>{total.data2021}</td>
            <td>{total.data2022}</td>
            <td >{total.data2024}</td>
            <td>{total.varience}</td>
            <td>{total.variencePer + "%"}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setNewRow({ category: "", data2021: 0, data2022: 0, data2024: 0 })}>Add Row</button>
      {newRow && (
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newRow.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="data2021"
            placeholder="2021"
            value={newRow.data2021}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="data2022"
            placeholder="2022"
            value={newRow.data2022}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="data2024"
            placeholder="2024"
            value={newRow.data2024}
            onChange={handleInputChange}
          />
          <button onClick={addRow}>Save</button>
        </div>
      )}
      <OPTable/>
    </div>
   
    </>
  );
};
