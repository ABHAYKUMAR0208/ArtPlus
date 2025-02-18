import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div className="font-sans p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-purple-600 font-semibold hover:underline mb-4"
      >
        &larr; Back to Blogs
      </button>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{blog.title}</h1>
      <p className="text-gray-600 mt-2">{blog.description}</p>
    </div>
  );
};

export default BlogDetail;