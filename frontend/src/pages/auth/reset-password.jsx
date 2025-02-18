import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reset-password/reset/${id}/${token}`)
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setError("Invalid or expired link");
      });
  }, [id, token]);

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(`http://localhost:5000/api/reset-password/reset/${id}/${token}`, { password })
      .then((response) => {
        setMessage(response.data.message);
        setError("");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-[400px] p-8 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

        {error && (
          <div className="w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 text-center rounded-lg animate-fade-in">
            {error}
          </div>
        )}
        {message && (
          <div className="w-full p-3 mb-4 bg-green-100 border border-green-400 text-green-700 text-center rounded-lg animate-fade-in">
            {message}
          </div>
        )}

        {isValid ? (
          <form onSubmit={handlePasswordReset} className="w-full">
            {/* New Password */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 pr-10 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-2 text-gray-700">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 pr-10 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-red-600 text-center">The reset link is invalid or expired.</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;