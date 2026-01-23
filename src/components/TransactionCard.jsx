import React from 'react'
import { Link } from "react-router-dom";

const TransactionCard = ({transaction, onDelete}) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{transaction.description}</strong>
        <div className="text-muted">
          {transaction.category} | {new Date(transaction.date).toDateString()}
        </div>
      </div>

      <div>
        <span
          className={`badge me-3 ${
            transaction.type === "income" ? "bg-success" : "bg-danger"
          }`}
        >
          ₹{transaction.amount}
        </span>
        <Link
  to={`/edit/${transaction._id}`}
  className="btn btn-sm btn-warning me-2"
>
  Edit
</Link>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(transaction._id)}
        >
          Delete
        </button>
      </div>
    </li>
    </div>
  )
}

export default TransactionCard
