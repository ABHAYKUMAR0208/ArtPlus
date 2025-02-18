import React from "react";

const NewsPage = () => {
  const newsItems = [
    {
      image: "https://via.placeholder.com/300x200", // Replace with actual image URLs
      title: "Menstrual Hygiene at Art Plus: Empowering Women",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Women's Day Celebration",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Art Plus Installs Sanitary Pad Vending Machines",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Fire Safety Training Courses",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Health Program",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Top Exporter Recognition",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque unde, reprehenderit quia eveniet, cupiditate officia porro vitae sunt aspernatur nemo reiciendis vero numquam nesciunt tempora deserunt. Reprehenderit similique repellat labore est numquam rem dignissimos deleniti.",
      link: "#",
    },
  ];

  const quickLinks = ["Quick Link 1", "Quick Link 2", "NewsCoverage"];

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="bg-purple-400 p-5 text-white text-center">
        <h1 className="text-2xl font-semibold">News and Coverage</h1>
      </div>

      <div className="container mx-auto p-5 flex flex-col md:flex-row gap-5">
        {/* Main Content */}
        <div className="flex-1">
          {/* Banner */}
          <div className="mb-5">
            <img
              src="https://via.placeholder.com/800x400" // Replace with the actual banner image URL
              alt="Banner"
              className="w-full h-auto rounded"
            />
            <p className="mt-3 text-center italic text-sm">
              From Nepal with Love: Art Plus Creations at the Mega Show 2025
            </p>
          </div>

          {/* News Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="border rounded overflow-hidden shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white border rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-black hover:text-blue-800"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;