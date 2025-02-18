import React from "react";
import { SocialIcon } from "react-social-icons";

function FAQs() {
  const getIconComponent = (icon) => {
    const iconSize = { width: 30, height: 30 }; // Set desired size here

    switch (icon) {
        case "whatsapp":
        return (
          <SocialIcon
            url="https://whatsapp.com"
            bgColor="#128c7e"
            style={iconSize}
          />
        );

      case "facebook":
        return (
          <SocialIcon
            url="https://facebook.com"
            bgColor="#3b5998"
            style={iconSize}
          />
        );
      case "instagram":
        return (
          <SocialIcon
            url="https://instagram.com"
            bgColor="#E1306C"
            style={iconSize}
          />
        );
      case "linkedin":
        return (
          <SocialIcon
            url="https://linkedin.com"
            bgColor="#0077B5"
            style={iconSize}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="faq-page">
      <header className="faq-header">
        <h1 className="faq-title text-4xl font-bold text-center py-6">FAQs</h1>
      </header>
      <main className="faq-content max-w-4xl mx-auto p-6 bg-gray-50">
        {/* Company and Product Section */}
        <section className="faq-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Company and Product</h2>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Where are Art Plus Located?
            </summary>
            <p className="ml-4 mt-2">
              Art Plus is a company based in Nepal, licensed and registered as a
              private company.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              What is felt? How is felting done?
            </summary>
            <p className="ml-4 mt-2">
              Felt is a textile made by matting, condensing, and pressing fibers
              together.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Are your products safe for children and pets?
            </summary>
            <p className="ml-4 mt-2">
              Yes, our products are made with safety in mind and are non-toxic.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Are workers of Art Plus given fair wages and have good working
              conditions?
            </summary>
            <p className="ml-4 mt-2">
              Yes, we ensure our workers are provided with fair wages and ethical
              working conditions.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Are products from Art Plus customizable? If yes, how do I process
              it?
            </summary>
            <p className="ml-4 mt-2">
              Yes, products are customizable. Please contact our support team for
              more details.
            </p>
          </details>
        </section>

        {/* Order Processing Section */}
        <section className="faq-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Do we receive any order confirmation after placing an order?
            </summary>
            <p className="ml-4 mt-2">
              Yes, an order confirmation email will be sent to your registered
              email address.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              What is the turnaround time for order processing?
            </summary>
            <p className="ml-4 mt-2">
              Orders are usually processed within 2-3 business days.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Do you escalate the orders if I request you?
            </summary>
            <p className="ml-4 mt-2">
              Yes, expedited processing is available. Please contact our support
              team.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              Is it possible to change the phone number, address, and date of
              delivery?
            </summary>
            <p className="ml-4 mt-2">
              Yes, but changes must be requested before the order is shipped.
            </p>
          </details>
        </section>

        {/* Shipment and Returns Section */}
        <section className="faq-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Shipment and Returns</h2>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              What do I do if my order arrives damaged or incorrect?
            </summary>
            <p className="ml-4 mt-2">
              Please contact our support team immediately for assistance.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              How long does it take to ship?
            </summary>
            <p className="ml-4 mt-2">
              Shipping times vary by location, typically between 5-10 business
              days.
            </p>
          </details>
        </section>

        {/* Durability and Maintenance Section */}
        <section className="faq-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Durability and Maintenance</h2>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              How do I clean or take care of felt products?
            </summary>
            <p className="ml-4 mt-2">
              Gently hand wash with cold water and air dry for best results.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              How durable are felt products? Do Art Plus have any guarantee for
              any product?
            </summary>
            <p className="ml-4 mt-2">
              Felt products are highly durable with proper care. For guarantee
              details, contact support.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              How can we process for Wholesale Applications?
            </summary>
            <p className="ml-4 mt-2">
              Please contact support with your requirements for wholesale
              inquiries.
            </p>
          </details>
        </section>

        {/* Payment Section */}
        <section className="faq-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Payment</h2>
          <details className="mb-2">
            <summary className="font-medium cursor-pointer">
              What are the payment methods accepted by Art Plus?
            </summary>
            <p className="ml-4 mt-2">
              We accept the following international payment methods:
              <ul className="list-disc ml-6 mt-2">
                <li>Bank Transfer</li>
                <li>Credit Cards</li>
                <li>PayPal</li>
              </ul>
            </p>
          </details>
        </section>

        {/* Footer Section */}
        <footer className="faq-footer text-center mt-8">
          <p>For any further queries, get help from here:</p>
          <div className="flex justify-center space-x-4 mt-4">
            {getIconComponent("whatsapp")}
            {getIconComponent("facebook")}
            {getIconComponent("instagram")}
            {getIconComponent("linkedin")}
          </div>
        </footer>
      </main>
    </div>
  );
}

export default FAQs;
