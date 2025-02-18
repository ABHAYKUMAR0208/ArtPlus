import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import {
  getSalesStats,
  getSalesGraphData,
} from "../../store/admin/sales-performance-slice";

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState("daily");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [salesStats, setSalesStats] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
  
      try {
        const today = new Date();
        const stats = await getSalesStats();
        const graph = await getSalesGraphData(activePeriod, selectedMonth, selectedYear);
  
        let formattedGraphData = [];
        if (activePeriod === "daily") {
          formattedGraphData = graph.filter(data => data._id?.day === today.getDate() && data._id?.month === today.getMonth() + 1 && data._id?.year === today.getFullYear()).map((data) => {
            return {
              time: `${String(data._id.day).padStart(2, "0")}-${String(data._id.month).padStart(2, "0")}`,
              totalAmount: data.totalAmount || 0,
              totalProducts: data.totalProducts || 0,
            };
          });
        } else if (activePeriod === "monthly") {
          formattedGraphData = graph.map((data) => {
            const month = data._id?.month || null;
            const day = data._id?.day || null;
            
            let date = "";
            if (day && month) {
              date = `${String(day).padStart(2, "0")}-${new Date(0, month - 1).toLocaleString("default", { month: "short" })}`;
            }
            
            return {
              date,
              totalAmount: data.totalAmount || 0,
              totalProducts: data.totalProducts || 0,
            };
          });
        } else if (activePeriod === "yearly") {
          const months = Array.from({ length: 12 }, (_, i) => i + 1);
          formattedGraphData = months.map((month) => {
            const data = graph.find((d) => d._id?.month === month) || {};
            return {
              month: new Date(0, month - 1).toLocaleString("default", { month: "short" }),
              totalAmount: data.totalAmount || 0,
              totalProducts: data.totalProducts || 0,
            };
          });
        }
  
        setSalesStats(stats);
        setGraphData(formattedGraphData);
      } catch (err) {
        setError("Failed to fetch sales data. Please try again later.");
        console.error("Error fetching sales data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [activePeriod, selectedMonth, selectedYear]);
  

  const selectedSales = salesStats?.[`${activePeriod}Sales`] || { totalAmount: 0, totalProducts: 0 };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold text-xl">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Sales Performance</h1>

      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setActivePeriod("daily")} className={`px-4 py-2 rounded ${activePeriod === "daily" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Daily</button>
        <button onClick={() => setActivePeriod("monthly")} className={`px-4 py-2 rounded ${activePeriod === "monthly" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Monthly</button>
        <button onClick={() => setActivePeriod("yearly")} className={`px-4 py-2 rounded ${activePeriod === "yearly" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Yearly</button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Sales Trends</h2>
        {graphData.length === 0 ? (
          <div className="text-gray-500">No data available for the selected period.</div>
        ) : activePeriod === "yearly" ? (
          <BarChart width={800} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#8884d8" name="Total Sales" />
            <Bar dataKey="totalProducts" fill="#82ca9d" name="Total Products" />
          </BarChart>
        ) : (
         <LineChart width={800} height={400} data={graphData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={activePeriod === "daily" ? "time" : "date"} />
  <YAxis />
  <Tooltip />
  <Legend />
  {/* Line for Total Sales Amount */}
  <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" name="Total Sales ($)" />
  {/* Line for Total Products Sold */}
  <Line type="monotone" dataKey="totalProducts" stroke="#82ca9d" name="Total Products Sold" />
</LineChart>

        )}
      </div>
    </div>
  );
};

export default Dashboard;
