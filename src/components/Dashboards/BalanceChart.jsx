import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BalanceChart = () => {

  const { transactions } =
    useContext(AppContext);

  // Group data by date
  const chartData =
    transactions.map(t => ({
      date: t.date,
      amount:
        t.type === "income"
          ? t.amount
          : -t.amount
    }));

  return (

    <div className="bg-white p-4 rounded shadow mt-6 w-full min-h-[300px]">

      <h2 className="font-bold mb-4">
        Balance Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart data={chartData}>

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
};

export default BalanceChart;