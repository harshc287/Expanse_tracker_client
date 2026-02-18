import { useEffect, useState } from "react";
import Api from "../services/api";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";

const Reports = () => {
  const [category, setCategory] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const categoryRes = await Api.get("/transactions/category");
        setCategory(categoryRes.data);

        const monthlyRes = await Api.get("/transactions/monthly");

        setIncome(
          monthlyRes.data
            .filter(item => item._id.type === "income")
            .map(item => ({
              month: item._id.month,
              total: item.total,
            }))
        );

        setExpense(
          monthlyRes.data
            .filter(item => item._id.type === "expense")
            .map(item => ({
              month: item._id.month,
              total: item.total,
            }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <h4 className="text-center mt-2 mb-2">Reports</h4>

      <div className="row" style={{ height: "calc(100vh - 60px)" }}>
        {/* Pie Chart */}
        <div className="col-md-6 h-100">
          <div className="card h-100 p-2">
            <h6 className="text-center mb-1">Expense by Category</h6>
            <div style={{ height: "100%" }}>
              <CategoryPieChart categoryData={category} />
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-md-6 h-100">
          <div className="card h-100 p-2">
            <h6 className="text-center mb-1">
              Monthly Income vs Expense
            </h6>
            <div style={{ height: "100%" }}>
              <MonthlyBarChart income={income} expense={expense} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
