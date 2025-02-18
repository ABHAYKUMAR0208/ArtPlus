import React from 'react';

const FairTradeCertifications = () => {
  const certifications = [
    {
      title: 'ISO 9001:2015 Certification',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ISO_Logo_%28Red_square%29.svg/1200px-ISO_Logo_%28Red_square%29.svg.png',
    },
    {
      title: 'Sedex Audit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati.',
      icon: '/path/to/sedex-icon.jpg',
    },
    {
      title: 'GoodWeave Certification',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati. lorem40 ipsum dolor sit amet, consectetur adipisicing elit. Ullam, obcaecati.',
      icon: '/path/to/goodweave-icon.jpg',
    },
  ];

  return (
    <div className="fair-trade bg-gray-50 text-gray-800">
      <header className="bg-purple-500 text-white py-8">
        <h1 className="text-4xl text-center font-bold">Fair Trade Certifications</h1>
      </header>

      <section className="content py-8 px-4 md:px-16">
        <p className="text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, voluptatem?
        </p>

        <div className="certifications grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="certification bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={cert.icon}
                alt={cert.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-purple-700">{cert.title}</h3>
              <p className="mt-2 text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8">
        <blockquote className="border-l-4 border-purple-700 pl-4 italic text-gray-600">
          Explore the difference of our ISO 9001:2015 certified products, Sedex audited practices, and GoodWeave certification.
        </blockquote>
      </footer>
    </div>
  );
};

export default FairTradeCertifications;
