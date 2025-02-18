import { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const url = `http://localhost:5000/api/reset-password/forget`;
      const { data } = await axios.post(url, { email });

      setMsg(data.message);
      setError("");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        setMsg("");
      } else {
        setError("An unexpected error occurred.");
        setMsg("");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <form
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center transform transition-all duration-300 hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password?</h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>

        {/* Email Input */}
        <div className="w-full mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 text-center rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {msg && (
          <div className="w-full p-3 mb-4 bg-green-100 border border-green-400 text-green-700 text-center rounded-lg">
            {msg}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button when loading
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>

        {/* Back to Login Link */}
        <p className="text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <a
            href="auth/login"
            className="text-blue-600 hover:text-blue-800 transition-all duration-300"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;