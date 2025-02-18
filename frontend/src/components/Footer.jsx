import React from "react";
import { Link } from "react-router-dom";
import footerData from "../config/footerData";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const { aboutLinks, usefulLinks, contactInfo, certifications } = footerData;

  return (
    <footer className="bg-gray-100 text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        {/* About and Useful Links Section */}
        <div className="w-full lg:w-1/2 px-4 flex flex-wrap">
          {/* About Section */}
          <div className="w-full sm:w-1/2 px-4 mb-6 sm:mb-0">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">About</h2>
            <nav className="list-none mb-10">
              {aboutLinks.length > 0 ? (
                aboutLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.url} className="text-gray-600 hover:text-gray-900">{link.label}</Link>
                  </li>
                ))
              ) : (
                <p>No links available</p>
              )}
            </nav>
          </div>

          {/* Useful Links Section */}
          <div className="w-full sm:w-1/2 px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Useful Links</h2>
            <nav className="list-none mb-10">
              {usefulLinks.length > 0 ? (
                usefulLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.url} className="text-gray-600 hover:text-gray-900">{link.label}</Link>
                  </li>
                ))
              ) : (
                <p>No links available</p>
              )}
            </nav>
          </div>
        </div>

        {/* Contact Info and Newsletter Section */}
        <div className="w-full lg:w-1/2 px-4 flex flex-wrap lg:flex-nowrap">
          {/* Contact Info Section */}
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Contact Info</h2>
            <p className="text-gray-600">{contactInfo.address}</p>
            {contactInfo.phone.map((phone, index) => (
              <p key={index} className="text-gray-600">{phone}</p>
            ))}
            <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-gray-900">{contactInfo.email}</a>
            <div className="flex mt-4">
              {contactInfo.socialLinks.map((social, index) => (
                <a key={index} href={social.url} className="mr-4" rel="noopener noreferrer" target="_blank">
                  {getIconComponent(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Newsletter</h2>
            <div className="flex flex-wrap items-center group">
              <input
                type="text"
                placeholder="Your email address"
                className="w-full p-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 text-sm"
              />
              <button className="p-2 ml-2 mt-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                Subscribe
              </button>
              {/* Hover Message */}
              <p className="text-gray-600 mt-3 text-sm hidden group-hover:block bg-blue-100 p-2 rounded">
                Get an instant discount code when you subscribe. After you subscribe, you agree to receive an email on new product updates, promotions and offers, tips, tutorials, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Certified By Section */}
        <div className="w-full mt-8 sm:mt-0">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 sm:mt-4 mx-8">Certified By</h2>
          <div className="flex space-x-2 ms-8">
            {certifications.map((cert, index) => (
              <img key={index} src={cert.logo} alt={cert.name} width={50} height={50} className="h-10 w-10" />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} ART+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Helper function to get the icon component based on the icon name
const getIconComponent = (icon) => {
  const iconSize = { width: 30, height: 30 };

  switch (icon) {
    case 'facebook':
      return <SocialIcon url="https://facebook.com" bgColor="#3b5998" style={iconSize} />;
    case 'instagram':
      return <SocialIcon url="https://instagram.com" bgColor="#E1306C" style={iconSize} />;
    case 'linkedin':
      return <SocialIcon url="https://linkedin.com" bgColor="#0077B5" style={iconSize} />;
    default:
      return null;
  }
};

export default Footer;
