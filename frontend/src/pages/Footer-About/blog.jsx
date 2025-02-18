import React from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "5 Easy DIY Crafts for Home Decor: Valentine's Special",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque ab vel mollitia perspiciatis sint, aperiam incidunt eum iusto laboriosam quo, ea possimus, tempore molestias voluptatem ratione impedit commodi culpa veritatis repellendus qui amet sequi alias magnam. Pariatur asperiores, iste, odit mollitia consequatur recusandae ipsam sunt ea, alias ratione nisi! Minus cum labore atque, voluptates maxime assumenda voluptatem maiores nulla. Quis sed inventore possimus, quibusdam dignissimos mollitia porro, praesentium quod facere quos iste cum perferendis sunt qui sapiente incidunt quas eaque. Quam ratione incidunt ducimus quas iusto, voluptatem dolorum voluptatum, ipsum omnis illum aperiam consequuntur consectetur, enim aliquid necessitatibus? Asperiores, nesciunt",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 2,
    title: "From Nepal with Love: Felt and Yarn Creations at the Mega Show 2023 in Hong Kong",
    description:
      "Explore our handmade felt creations showcased at the Mega Show in Hong Kong.",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 3,
    title: "5 Easy Halloween Felt Decor Ideas This Year 2023",
    description:
      "Spooky yet charming felt decor ideas for your Halloween celebrations.",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 4,
    title: "Eco-Friendly Felt Products to Try in 2023 to Reduce Plastic Waste",
    description:
      "Discover eco-friendly felt alternatives for sustainable living.",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 5,
    title: "Menstrual Hygiene at Felt and Yarn: Bridging the Gap for Women Empowerment",
    description:
      "Read about our efforts to promote menstrual hygiene and empower women.",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 6,
    title: "Interior Design Trends That Will Be Big in 2023",
    description:
      "Stay ahead of the curve with these top interior design trends for 2023.",
    image: "https://via.placeholder.com/800x400",
  },
];

const BlogPage = () => {
  const navigate = useNavigate();

  const handleReadMore = (blogId) => {
    navigate(`/about/blogs/${blogId}`);
  };

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="bg-purple-400 p-5 text-white text-center">
        <h1 className="text-2xl font-semibold">
          Art Plus Blog | Creative Inspiration, Art Plus Crafts
        </h1>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto p-5">
        <div className="grid gap-6">
          {/* Featured Blog */}
          <div className="border rounded shadow-lg overflow-hidden">
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{blogs[0].title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blogs[0].description}
              </p>
              <button
                onClick={() => handleReadMore(blogs[0].id)}
                className="text-purple-600 font-semibold hover:underline"
              >
                Read More
              </button>
            </div>
          </div>

          {/* Blog List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="border rounded shadow-sm overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.description}
                  </p>
                  <button
                    onClick={() => handleReadMore(blog.id)}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;