import React from "react";

function HowToOrder() {
  return (
    <div className="how-to-order-page bg-gray-50 min-h-screen">
      <header className="bg-purple-500 text-white py-6">
        <h1 className="text-4xl font-bold text-center">How to Order?</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-6">
        {/* Video Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Watch the Video</h2>
          <div className="video-container mb-4">
            <iframe
              className="w-full h-96"
              src="https://www.youtube.com/embed/B-UjLwsxdVo"
              title="How to Place an Order"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="mb-4">
            We have a very in-depth video explaining how you can easily place an order with us. <strong>Spoiler Alert! </strong> 
            You might get a discount code there.
          </p>
        </section>

        {/* Information Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">In this video, you will learn:</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>How to place a custom order?</li>
            <li>How to select colors and sizes?</li>
            <li>What shipment modes do we offer?</li>
            <li>What would be the shipment turnaround time?</li>
            <li>What payment modes do we offer?</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HowToOrder;
