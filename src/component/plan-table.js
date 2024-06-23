import React from "react";
import "./table"; 

const PlaneTable = () => {
  return (
    <table style={{border:"1px solid black"}}>
      <thead>
        <tr>
          <th style={{width:"200px"}}>(million)</th>
          <th>2021</th>
          <th>2022</th>
          <th>2024</th>
          <th>Varience</th>
          <th>Varience %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{width:"200px"}}>Accounting Standard</td>
          <td>IFRS</td>
          <td>IFRS</td>
          <td>IFRS</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td style={{width:"200px"}}>Audit Method</td>
          <td>IFRS 16Adj</td>
          <td>IFRS 16Adj</td>
          <td>IFRS 16Adj</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td style={{width:"200px"}}>Display Currency</td>
          <td>HKD</td>
          <td>HKD</td>
          <td>HKD</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td style={{width:"200px"}}>Fx Rate</td>
          <td>0.12826</td>
          <td>0.12826</td>
          <td>0.12826</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlaneTable;
