import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ categoryData }) => {
  const data = {
    labels: categoryData.map(item => item._id),
    datasets: [
      {
        data: categoryData.map(item => item.total),
        backgroundColor: [
          "#dc3545",
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#6f42c1",
          "#20c997",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default CategoryPieChart;
