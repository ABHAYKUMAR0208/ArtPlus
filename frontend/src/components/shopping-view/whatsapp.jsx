import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+9779861542443"; // Your WhatsApp number (with country code)
  const message = "Hello, I'm interested in your products!"; // Predefined message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex items-center justify-center w-16 h-16 
                 bg-green-500 text-white rounded-full shadow-lg 
                 transition-transform duration-300 hover:scale-110"
    >
      {/* Official WhatsApp Logo */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="w-10 h-10"
      />
    </a>
  );
};

export default WhatsAppButton;
