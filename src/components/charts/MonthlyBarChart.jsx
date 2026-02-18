import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const MonthlyBarChart = ({ income, expense }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: months.map((_, index) =>
          income.find(i => i.month === index + 1)?.total || 0
        ),
        backgroundColor: "#198754",
      },
      {
        label: "Expense",
        data: months.map((_, index) =>
          expense.find(e => e.month === index + 1)?.total || 0
        ),
        backgroundColor: "#dc3545",
      },
    ],
  };

  return <Bar data={data} />;
};

export default MonthlyBarChart;
