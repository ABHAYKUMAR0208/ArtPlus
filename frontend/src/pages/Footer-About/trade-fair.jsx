import React from "react";

const TradeFairPage = () => {
  const events = [
    {
      title: "ASD Las Vegas Show",
      booth: "#C31639",
      dates: "August 20 - August 23, 2023",
      location: "Las Vegas Convention Center, Las Vegas, NV, USA",
    },
    {
      title: "Gifts World Expo 2023",
      booth: "#C34",
      dates: "September 7 - September 9, 2023",
      location: "Tripura Vasini, Palace Grounds, Bengaluru, India",
    },
    {
      title: "Mega Show Hong Kong",
      booth: "#3F-C17 & C19",
      dates: "October 20 - October 23, 2023",
      location: "Hong Kong Convention and Exhibition Centre, Wan Chai, Hong Kong",
    },
  ];

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="bg-purple-400 p-5 text-white text-center">
        <h1 className="text-2xl font-semibold">Trade Fair & Exhibition</h1>
      </div>

      <div className="container mx-auto p-5">
        {/* Introduction Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Join Us at Upcoming Trade Fairs: Experience Art Plus Crafted
            Stories
          </h2>
          <p className="leading-relaxed">
            Greetings from Art Plus,
            <br />
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure quos aut deleniti suscipit! Perferendis iure maiores fuga numquam dolor molestiae commodi sapiente inventore voluptas tempore expedita fugiat mollitia explicabo nam accusantium, soluta unde error aliquid?
          </p>
        </div>

        {/* Event Details Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Important Dates for Your Calendar:
          </h2>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <ul className="list-none space-y-1">
                  <li>
                    <strong>Booth:</strong> {event.booth}
                  </li>
                  <li>
                    <strong>Dates:</strong> {event.dates}
                  </li>
                  <li>
                    <strong>Location:</strong> {event.location}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Section */}
        <div className="mt-8">
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dignissimos, voluptates quas harum voluptas saepe similique aliquam voluptate fuga repellendus excepturi, et blanditiis earum fugiat.
          </p>
          <p className="mt-4 leading-relaxed">
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod eos, natus perspiciatis voluptatum animi adipisci ex numquam voluptatem assumenda dolore repudiandae blanditiis omnis necessitatibus molestias mollitia earum a voluptas explicabo eveniet autem nesciunt iusto recusandae!
          </p>
          <p className="mt-4 italic">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique corporis distinctio rerum inventore possimus esse aliquam aperiam dolorem fuga, maxime et in labore pariatur velit ab vel sunt, quo veritatis vitae voluptatem. Architecto, aliquid neque aliquam ipsa corrupti perferendis magnam?
          </p>
          <p className="mt-4 font-semibold">Best regards,</p>
          <p>The Art Plus & Team</p>
        </div>
      </div>
    </div>
  );
};

export default TradeFairPage;