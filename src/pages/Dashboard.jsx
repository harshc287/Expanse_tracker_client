import { useEffect, useState } from "react";
import Api from "../services/api";
import TransactionCard from "../components/TransactionCard";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const t = await Api.get("/transactions/addTransaction");
      const b = await Api.get("/transactions/balance");

      setTransactions(t.data);
      setBalance(b.data.balance);

      // Calculate income & expense
      let inc = 0;
      let exp = 0;
      t.data.forEach(tx => {
        if (tx.type === "income") inc += tx.amount;
        else exp += tx.amount;
      });

      setIncome(inc);
      setExpense(exp);
    } catch {
      alert("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const deleteTx = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await Api.delete(`/transactions/deleteTransaction/${id}`);
      loadData();
    } catch {
      alert("Error deleting transaction");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Balance</h6>
              <h3 className={balance >= 0 ? "text-success" : "text-danger"}>
                ₹{balance}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Income</h6>
              <h3 className="text-success">₹{income}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Expense</h6>
              <h3 className="text-danger">₹{expense}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Recent Transactions</h5>

          {loading ? (
            <p>Loading...</p>
          ) : transactions.length === 0 ? (
            <div className="alert alert-info">No transactions found</div>
          ) : (
            <ul className="list-group list-group-flush">
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
      </div>
    </div>
  );
};

export default Dashboard;
