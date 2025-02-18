import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthPage() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-600 mb-4">🚫 Unauthorized Access</h1>
                <p className="text-gray-600 mb-4">
                    Oops! It looks like you don't have permission to view this page.
                </p>
                <p className="text-gray-600 mb-6">
                    Please contact the administrator if you believe this is a mistake.
                </p>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate('/shop/home')} 
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
}

export default UnauthPage;