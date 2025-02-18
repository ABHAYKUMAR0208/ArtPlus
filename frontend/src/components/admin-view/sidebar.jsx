import { Fragment } from "react";
import {
  ChartBarIncreasing,
  LayoutDashboard,
  ShoppingCart,
  Package,
  ChartPie,
  MessageSquareText,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [

  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "Sales",
    label: "Sales Performance",
    path: "/admin/sales",
    icon: <ChartPie />,
  },
  {
    id: "products", 
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Package />,
  },
  {
    id: "feedback",
    label: "Feedback",
    path: "/admin/feedback",
    icon: <MessageSquareText />,
  },
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav aria-label="Admin Navigation" className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((MenuItem) => (
        <div
          key={MenuItem.id}
          onClick={() => {
            navigate(MenuItem.path);
          setOpen? setOpen(false) : null; 
        }}
          className={`flex text-lg cursor-pointer items-center gap-2 rounded-md px-3 py-2 
            ${location.pathname === MenuItem.path ? 'bg-muted text-foreground' : 'text-muted-foreground'} 
            hover:bg-muted hover:text-foreground`}
        >
          {MenuItem.icon}
          <span>{MenuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartBarIncreasing size={30} />
                <span className="text-2xl font-extrabold"></span>
              </SheetTitle>
              <SheetDescription>
              Navigate through admin options here.
            </SheetDescription>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartBarIncreasing size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
