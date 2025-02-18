import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin/sales";

// Function to get sales statistics
export const getSalesStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sales-stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales stats:", error);
    throw error;
  }
};

// Function to get sales graph data
export const getSalesGraphData = async (period, month = null, startDate = null, endDate = null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/graph-data`, {
      params: {
        period,
        month,
        year: new Date().getFullYear(), // Ensure the correct year is sent
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sales graph data:", error);
    throw error;
  }
};

