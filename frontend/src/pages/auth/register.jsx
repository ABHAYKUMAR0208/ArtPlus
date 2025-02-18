import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, setUser } from "@/store/auth-slice";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!formData.userName || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      const { success, message } = response;
      if (success) {
        toast.success(message || "Registration successful!");
        dispatch(setUser(null));
        navigate("/auth/login");
      } else {
        toast.error(message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />
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
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark">Sign Up</button>
      </form>
    </div>
  );
}

export default AuthRegister;
