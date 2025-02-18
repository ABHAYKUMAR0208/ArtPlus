import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../store/shop/order-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import ConfirmationDialog from "../ui/confirmation-dialog";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleCancelOrder = () => {
    setIsConfirmationOpen(true); // Open the confirmation dialog
  };

  const handleConfirmCancel = () => {
    dispatch(cancelOrder(orderDetails._id))
      .unwrap()
      .then(() => {
        toast.success("Order canceled successfully!");
        setIsConfirmationOpen(false); // Close the dialog after successful cancellation
      })
      .catch(() => toast.error("Failed to cancel order!"));
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* Order Summary Section */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 ${
                {
                  confirmed: "bg-green-500",
                  rejected: "bg-red-600",
                  pending: "bg-yellow-500",
                  process: "bg-blue-500",
                  shipping: "bg-green-600",
                  delivered: "bg-green-600",
                  canceled: "bg-red-600",
                }[orderDetails?.orderStatus] || "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Order Items Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shipping Info Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        {/* Cancel Order Button (Visible only for pending orders) */}
        {orderDetails?.orderStatus === "pending" && (
          <button
            className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
      />
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;