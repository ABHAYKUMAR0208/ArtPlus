import React from 'react';

const ContactUs = () => {
    console.log("ContactUs component rendered");

  return (
    <div className="w-full md:w-1/4 px-4">
        <h6>Contact Us</h6>
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
    
  );
};

export default ContactUs;