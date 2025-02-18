import React, { useEffect, useState } from "react";

const CareerPage = () => {
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum turpis vitae ante pharetra, eget vehicula risus sagittis.",
      name: "John Doe",
      role: "Software Engineer",
      image: "https://via.placeholder.com/50",
    },
    {
      quote:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Jane Smith",
      role: "Project Manager",
      image: "https://via.placeholder.com/50",
    },
    {
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      name: "Michael Johnson",
      role: "Designer",
      image: "https://via.placeholder.com/50",
    },
    {
      quote:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
      name: "Emily Davis",
      role: "Marketing Specialist",
      image: "https://via.placeholder.com/50",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleApplyNow = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans leading-relaxed">
      {/* Header Section */}
      <div className="bg-purple-400 p-5 text-white text-center">
        <div className="text-2xl font-semibold">Career at ArtPlus</div>
      </div>

      {/* Introduction Section with Image */}
      <div className="text-center p-5">
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQe0QVNcwJeo-MwDIxYOh4nN1F7AU8jWs3Amf3SEq3y9-5yWZfYH0GcyZppd-o-zOX4qnG3ylyDz-Wk7uiCDqtcgoVE70iFndThaBTD0g"
          alt="Introduction to ArtPlus"
          className="max-w-full h-auto mx-auto mb-4"
        />
        <p className="max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A numquam sunt voluptas facere sequi voluptatum placeat eligendi nulla autem suscipit corporis explicabo, quaerat tempora aliquid similique corrupti quam necessitatibus enim aspernatur labore esse amet! Laudantium omnis non mollitia impedit? Quae.
        </p>
        <button
          className="mt-4 px-5 py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
          onClick={handleApplyNow}
        >
          Apply Now
        </button>
      </div>

      {/* Working at ArtPlus Section */}
      <div className="p-5 text-center">
        <div className=" text-2xl font-semibold">Working at ArtPlus</div>
        <p className="max-w-3xl mx-auto">
          ArtPlus works with a passionate team to create a culture of
          maintaining quality and integrity while driving environmental
          sustainability with creativity. We are more than a workplace—we’re a
          family committed to social impact and innovation.
        </p>
      </div>

      {/* Growing Together Section */}
      <div className="p-5 text-center">
        <div className=" text-2xl font-semibold">Growing Together</div>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {["https://via.placeholder.com/200x150","https://via.placeholder.com/200x150","https://via.placeholder.com/200x150","https://via.placeholder.com/200x150"].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Growing Together ${index + 1}`}
              className="w-48 h-36 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Reasons to Love Working at ArtPlus */}
      <div className="p-5 text-center bg-gray-100">
        <div className=" text-2xl font-semibold">The reasons you will love working with us</div>
        <p className="max-w-3xl mx-auto mb-5">
          We offer a collaborative, supportive work environment that fosters
          innovation and personal development. Benefits include:
        </p>
        <ul className="list-none max-w-3xl mx-auto text-left">
          {["Flexible work schedules and hybrid options","Professional growth opportunities"].map((reason, index) => (
            <li key={index} className="mb-2 pl-5">• {reason}</li>
          ))}
        </ul>
      </div>

      {/* Hear from our employees */}
      <div className="relative w-full max-w-3xl mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold mb-6">Hear from our employees</h2>
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={
                index === currentIndex
                  ? "flex flex-col items-center text-center"
                  : "hidden"
              }
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mb-2"
              />
              <p className="italic mb-1">"{testimonial.quote}"</p>
              <h4 className="font-bold mb-1">{testimonial.name}</h4>
              <span className="text-sm text-gray-500">{testimonial.role}</span>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevSlide}
            className="bg-black text-white border-none rounded-full p-2 cursor-pointer hover:bg-gray-700"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="bg-black text-white border-none rounded-full p-2 cursor-pointer hover:bg-gray-700"
          >
            &#10095;
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full mx-1 ${
                index === currentIndex ? "bg-black" : "bg-gray-300"
              } border-none cursor-pointer`}
            ></button>
          ))}
        </div>
      </div>

      {/* Vacancies */}
      <div className="p-5 text-center">
      <div className=" text-2xl font-semibold">Vacancies</div>
      <img
          src="https://st.depositphotos.com/1031343/3762/v/450/depositphotos_37622953-stock-illustration-no-vacancies-stamp.jpg"
          alt="Introduction to ArtPlus"
          className="max-w-full h-20 mx-auto mb-4 mt-4"
        />
      <div id="footer" className="text-center p-5">
        <p className="italic ">No Vacancies at ArtPlus.</p>
      </div>
      </div>
    </div>
  );
};

export default CareerPage;