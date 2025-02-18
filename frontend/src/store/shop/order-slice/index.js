import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  error: null, 
};

const BASE_URL = "http://localhost:5000/api/shop/order";

// Create a new order
export const createNewOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order creation failed");
    }
  }
);

// Capture payment (Use PUT instead of POST)
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/confirm-payment/${orderId}`, {
        paymentId,
        payerId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment failed");
    }
  }
);

// Get all orders by user
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order details not found");
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      if (!orderId) throw new Error("Order ID is required");

      const response = await axios.put(`${BASE_URL}/cancel/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Cancellation failed");
    }
  }
);

// Redux Slice
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("currentOrderId", action.payload.orderId);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get All Orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const canceledOrderId = action.payload.data._id;

        state.orderList = state.orderList.map((order) =>
          order._id === canceledOrderId
            ? { ...order, orderStatus: "canceled" }
            : order
        );

        if (state.orderDetails?.id === canceledOrderId) {
          state.orderDetails.orderStatus = "canceled";
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
