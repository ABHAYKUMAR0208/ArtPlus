import { useEffect, useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminFeedbackDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contact`);
        const result = await response.json();
        if (result.success) {
          setMessages(result.data);
          setFilteredMessages(result.data); // Initialize filteredMessages with all messages
        } else {
          toast.error("Failed to fetch messages.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while fetching messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle search and filter
  useEffect(() => {
    const filtered = messages.filter(
      (message) =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messages]); // Add messages to the dependency array

  const handleReadMore = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6C63FF" size={50} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Feedback Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
          <FaSearch className="text-gray-400 mx-2" />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 outline-none"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{message.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{message.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="line-clamp-2">
                      {message.message}
                    </div>
                    {message.message.length > 100 && (
                      <button
                        onClick={() => handleReadMore(message)}
                        className="text-blue-500 hover:underline mt-1"
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(message.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying full message */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Message Details</h2>
            <p className="text-gray-700 mb-4">{selectedMessage.message}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackDashboard;