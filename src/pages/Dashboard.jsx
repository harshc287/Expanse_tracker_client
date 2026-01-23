import { useEffect, useState } from "react";
import Api from "../services/api";
import TransactionCard from "../components/TransactionCard";


const Dashboard = () => {
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(true)
    

    const loadData = async () => {
        try{
            setLoading(true)
        
        const t = await Api.get("/transactions/getTransactions")
        const b = await Api.get("/transactions/balance")
        setTransactions(t.data)
        setBalance(b.data.balance)
        }catch(errror){
            alert("Error loading dashboard data")
        }finally{
            setLoading(false)
        }

    }

    const deleteTx = async (id) => {
         if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

        try{
        await Api.delete(`/transactions/deleteTransaction/${id}`)
        loadData()
        }catch{
            alert("Errror deleting transcation")
        }
    }

    useEffect(() => {
        loadData()
    }, [])

  return (
<div className="container mt-4">
      {/* Balance Section */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <h5 className="text-muted">Total Balance</h5>
          <h2 className={balance >= 0 ? "text-success" : "text-danger"}>
            ₹{balance}
          </h2>
        </div>
      </div>

      {/* Transactions */}
      <h5 className="mb-3">Recent Transactions</h5>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <div className="alert alert-info">No transactions found</div>
      ) : (
        <ul className="list-group">
          {transactions.map((tx) => (
            <TransactionCard
              key={tx._id}
              transaction={tx}
              onDelete={deleteTx}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
