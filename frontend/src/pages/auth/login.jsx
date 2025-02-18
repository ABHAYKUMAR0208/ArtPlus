import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      const { success, message } = response;
      success ? toast.success(message || "Login successful!") : toast.error(message || "Login failed. Please try again.");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p className="mt-2">
          Don't have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Register</Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-3 border rounded"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded pr-10"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 mb-5 flex items-center text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={20} />}
          </button>
          <div className="text-right mt-1">
            <Link to="/forget-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark">Sign In</button>
      </form>
    </div>
  );
}

export default AuthLogin;
