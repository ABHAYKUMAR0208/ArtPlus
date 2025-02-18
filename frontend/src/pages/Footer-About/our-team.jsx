import React from 'react';

const OurTeamArtisans = () => {
  const teamMembers = [
    {
      name: 'Sarina Sherpa',
      description: 'Driving all of us, she doesn’t allow us to settle for anything less than the best. She makes sure we deliver.',
      image: '/path/to/sarina.jpg',
    },
    {
      name: 'Mina Yogini',
      description: 'A deep thinker who managed every fine detail to ensure high-quality outcomes. Her creativity knows no bounds.',
      image: '/path/to/mina.jpg',
    },
    {
      name: 'Srijana KC',
      description: 'A meticulous individual ensuring all product goals are met. She is our go-to person for problem-solving.',
      image: '/path/to/srijana.jpg',
    },
    {
      name: 'Anita Ram',
      description: 'An organized and adept leader who oversees every aspect to deliver superior results.',
      image: '/path/to/anita.jpg',
    },
    {
      name: 'Kabidhi Maya Sherpa & Team',
      description: 'Crafting beautiful handmade goods with intricate detail and utmost care.',
      image: '/path/to/kabidhi.jpg',
    },
    {
      name: 'Niru Sherpa',
      description: 'Providing key support to the team, always ensuring deadlines are met.',
      image: '/path/to/niru.jpg',
    },
    {
      name: 'Subharti Sherchan & Team',
      description: 'Designing and assembling signature designs, making every piece memorable.',
      image: '/path/to/shanti.jpg',
    },
    {
      name: 'Sabina Lamba & Team',
      description: 'Perfecting the craftsmanship of our products, ensuring every detail is accounted for.',
      image: '/path/to/sabina.jpg',
    },
    {
        name: 'Subodh & Team',
        description: 'Perfecting the craftsmanship of our products, ensuring every detail is accounted for.',
        image: '/path/to/subodh.jpg',
      },
  ];

  return (
    <div className="our-team bg-gray-50 text-gray-800">
      <header className="bg-purple-500 text-white py-8">
        <h1 className="text-4xl text-center font-bold">Our Team & Artisans</h1>
      </header>

      <section className="intro text-center py-8 px-4 md:px-16">
        <img
          src="/path/to/group-photo.jpg" // Replace with the actual path to the image
          alt="Group of people"
          className="mx-auto w-full max-w-4xl rounded-lg shadow-md"
        />
        <p className="mt-4 text-lg">
          Every team member is tirelessly working for the business to produce the best products and meet our customers' high expectations.
        </p>
        <p className="mt-2 text-lg">
          When you choose us, you aren’t just supporting a business; you’re supporting sustainable livelihoods.
        </p>
      </section>

      <section className="team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 py-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-member bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-purple-700">{member.name}</h3>
            <p className="mt-2 text-gray-600">{member.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurTeamArtisans;