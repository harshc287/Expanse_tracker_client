import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react'
import Api from "../services/api";

const AddTransaction = () => {
    const [form, setForm] = useState({ 
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: ""
    })

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            Api.get(`/transactions/getTransactionById/${id}`)
            .then((res) => {
                setForm({...res.data,
                    date: res.data.date.substring(0, 10),
            })
            }).catch(()=> alert("error loading transaction"))
        }
    }, [id])

    const submit = async (e) => {
        e.preventDefault()
    


        try {
            if (id) {
                await Api.put(`/transactions/updateTransaction/${id}`, form)
                alert("Transaction updated")
            } else {
                await Api.post("/transactions/addTranscation", form)
                alert("transaction added")
            }
            navigate("/")
        } catch {
            alert("Error Adding transaction")
        }
    }

return (
  <div className="container mt-5" style={{ maxWidth: "500px" }}>
    <h3 className="mb-4 text-center">
      {id ? "Edit Transaction" : "Add Transaction"}
    </h3>

    <form onSubmit={submit}>
      {/* Amount */}
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />
      </div>

      {/* Type */}
      <div className="mb-3">
        <label className="form-label">Transaction Type</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Food, Rent"
          required
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
      </div>

      {/* Date */}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={form.date}
          required
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Optional description"
          value={form.description}
          required
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        {id ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  </div>
);

};

export default AddTransaction
