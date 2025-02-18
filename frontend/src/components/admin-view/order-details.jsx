import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "react-toastify";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* Order Details */}
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
                orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : orderDetails?.orderStatus === "pending"
                  ? "bg-yellow-500"
                  : orderDetails?.orderStatus === "process"
                  ? "bg-blue-500"
                  : orderDetails?.orderStatus === "shipping"
                  ? "bg-green-600"
                  : orderDetails?.orderStatus === "delivered"
                  ? "bg-green-600"
                  : orderDetails?.orderStatus === "canceled"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-3">
            {orderDetails?.cartItems?.length > 0 ? (
              orderDetails?.cartItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))
            ) : (
              <p>No items in the order.</p>
            )}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Order Status Update Form - Hidden if Canceled */}
        <div>
          {orderDetails?.orderStatus === "canceled" ? (
            <p className="text-indigo-900 font-medium">
              This order has been canceled. Status update is not allowed.
            </p>
          ) : (
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "process", label: "In Process" },
                    { id: "shipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          )}
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
