import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";

// Helper function to group orders by date
const groupOrdersByDate = (orders) => {
  if (!orders || !orders.length) return {};
  return orders.reduce((grouped, order) => {
    const date = order.orderDate.split("T")[0]; // Extract the date part
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(order);
    return grouped;
  }, {});
};

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  // Group orders by date
  const groupedOrders = groupOrdersByDate(orderList);

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedOrders).map(([date, orders]) => (
              <React.Fragment key={date}>
                <TableRow>
                  <TableCell colSpan={5} className="bg-gray-100 font-bold">
                    {date}
                  </TableCell>
                </TableRow>
                {orders.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : orderItem?.orderStatus === "pending"
                            ? "bg-yellow-500"
                            : orderItem?.orderStatus === "process"
                            ? "bg-blue-500"
                            : orderItem?.orderStatus === "shipping"
                            ? "bg-green-600"
                            : orderItem?.orderStatus === "delivered"
                            ? "bg-green-600"
                            : orderItem?.orderStatus === "canceled"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        {/* Dialog for order details */}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
