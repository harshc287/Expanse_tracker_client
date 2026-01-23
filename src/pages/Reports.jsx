import { useEffect, useState } from "react";
import Api from "../services/api";

import React from 'react'

const Reports = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        Api.get("/transactions/category").then(res =>setCategory(res.data))
    }, [])
  return (
    <div>
      <div className="container mt-4">
      <h3>Category Report</h3>

      <ul className="list-group">
        {category.map(c => (
          <li key={c._id} className="list-group-item">
            {c._id} : ₹{c.total}
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Reports
