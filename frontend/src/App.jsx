import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import "./index.css";

// Import your components and pages
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ForgetPassword from "./pages/auth/forget-password";
import ResetPasswordPage from "./pages/auth/reset-password";

import AdminLayout from "./components/admin-view/layout";
import AdminSalesPerformance from "./pages/admin-view/sales";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/product";
import AdminOrders from "./pages/admin-view/orders";

import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import Footer from "./components/Footer";
import Header from "./components/header";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import NotFound from "./pages/not-found";

import HowToOrder from "./pages/footerdata-Usefulldata/howtoorder";
import ShippingReturns from "./pages/footerdata-Usefulldata/shipping-return";
import WholeSale from "./pages/footerdata-Usefulldata/wholesale";
import ContactUs from './pages/footerdata-Usefulldata/contact-us';
import FAQs from './pages/footerdata-Usefulldata/FAQs';
import TermsAndConditions from './pages/footerdata-Usefulldata/Terms';
import PaymentSecurity from "./pages/footerdata-Usefulldata/payment-security";
import PrivacyPolicy from "./pages/footerdata-Usefulldata/PrivacyPolicy";
import SiteMap from "./pages/footerdata-Usefulldata/sitemap";

// Footer About links
import WhoAreWe from "./pages/Footer-About/who-are-we";
import OurTeamArtisans from "./pages/Footer-About/our-team";
import FairTradeCertifications from "./pages/Footer-About/fair-trade-certificate";
import CareerPage from "./pages/Footer-About/careers-at-AP";
import NewsPage from "./pages/Footer-About/news";
import TradeFairPage from "./pages/Footer-About/trade-fair";
import BlogPage from "./pages/Footer-About/blog";
import AdminFeedbackDashboard from "./pages/admin-view/AdminFeedbackDashboard";
import BlogDetail from "./pages/Footer-About/BlogDetails";
import WhatsAppButton from "./components/shopping-view/whatsapp";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

 useEffect(() => {
  const token = JSON.parse(sessionStorage.getItem('token'));
 
    dispatch(checkAuth(token));

}, [dispatch, isAuthenticated]);


  if (isLoading) {
    return (
      <Skeleton className="w-full h-[600px] bg-gray-100 flex justify-center items-center">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </Skeleton>
    );
  }

  // Determine if the current route is in the admin panel
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Determine if the current route should hide the header/footer
  const isAuthRoute =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register" ||
    location.pathname === "/forget-password" ||
    location.pathname.startsWith("/reset-password");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white">
      {/* Render Header only if not in admin panel or auth-related routes */}
      {!isAdminRoute && !isAuthRoute && <Header />}

      {!isAdminRoute && !isAuthRoute && <WhatsAppButton />}


      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        {/* Authentication Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="sales" element={<AdminSalesPerformance />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="feedback" element={<AdminFeedbackDashboard />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<SearchProducts />} />
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>

        {/* Forgot Password & Reset Password Routes */}
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />

        {/* Footer Useful-links Routes */}
        <Route path="/useful-links" element={<ShoppingLayout />}>
          <Route path="faqs" element={<FAQs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="payment-security" element={<PaymentSecurity />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="shipping-return" element={<ShippingReturns />} />
          <Route path="how-to-order" element={<HowToOrder />} />
          <Route path="wholesale" element={<WholeSale />} />
          <Route path="sitemap" element={<SiteMap />} />
        </Route>

        {/* Footer About Routes */}
        <Route path="/about" element={<ShoppingLayout />}>
          <Route path="who-we-are" element={<WhoAreWe />} />
          <Route path="team-artisans" element={<OurTeamArtisans />} />
          <Route path="certifications" element={<FairTradeCertifications />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="trade-fair" element={<TradeFairPage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
        </Route>

        {/* Other Routes */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Render Footer only if not in admin panel or auth-related routes */}
      {!isAdminRoute && !isAuthRoute && <Footer />}

      {/* React-Toastify Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
