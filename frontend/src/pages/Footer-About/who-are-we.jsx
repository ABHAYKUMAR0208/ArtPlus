import React from 'react';

const WhoAreWe = () => {
  return (
    <div className="who-are-we bg-gray-50 text-gray-800">
      <header className="bg-purple-500 text-white py-8">
        <h1 className="text-4xl text-center font-base">Who are we?</h1>
      </header>

      <section className="intro text-center py-8">
        <img
          src="/path/to/group-photo.jpg" // Replace with the actual path to the image
          alt="Group of people"
          className="mx-auto w-full max-w-3xl rounded-lg shadow-md"
        />
        <p className="mt-4 text-xl font-semibold text-black">Creating a sustainable community through trade</p>
      </section>

      <section className="content px-4 md:px-16 py-8">
        <p className="mb-6">Namaste! We started our work... Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti, asperiores provident aspernatur animi, expedita alias a nisi doloribus praesentium vel velit illum. Sit, ipsam velit repellat facere, doloremque tempore ab iure eius reiciendis laborum fugit veniam magni quo et ipsa rerum aspernatur asperiores saepe vitae optio aut laudantium? Nesciunt.</p>

        <blockquote className="border-l-4 border-purple-600 pl-4 italic text-gray-600">
          <p>“Join us on our colorful journey to make a positive impact on the world. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, tempora! Recusandae doloremque omnis, deserunt molestias voluptatibus nobis laudantium dolore facere iusto quae harum, maxime veniam sed? Tenetur, harum! Consequuntur fugit nesciunt id ullam laborum quo inventore sapiente labore ipsa quis dolores impedit ab molestias ratione, illo vel amet iusto quos.”</p>
        </blockquote>

        <div className="vision-mission grid grid-cols-1 gap-8 mt-8">
          <div className="mission">
            <h2 className="text-2xl font-base text-black">MISSION</h2>
            <p className="mt-2">To extend meaningful employment opportunities... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia et sed magnam nemo iste optio sit alias, fuga accusamus distinctio eius iure reiciendis. Iusto molestiae doloribus soluta commodi vero atque id, praesentium distinctio est? Velit fugit possimus ut rem ratione id, totam, accusamus quis, ex iusto maxime quidem optio eveniet.</p>
          </div>
          <div className="vision">
            <h2 className="text-2xl font-base text-black">VISION</h2>
            <p className="mt-2">We envision... Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum doloremque vitae in expedita, laborum alias explicabo aliquam repudiandae, illum eaque natus officiis voluptate incidunt sequi laudantium perferendis sed distinctio placeat ut velit, ea voluptas totam optio dignissimos. Veritatis harum cum tempora, eius reiciendis voluptates accusamus, error tenetur voluptas porro voluptate.  </p>
          </div>
        </div>

        <div className="sustainability mt-8">
          <h2 className="text-2xl font-base text-black">SUSTAINABILITY</h2>
          <p className="mt-2">We focus on... Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad vero, veritatis fugiat id provident similique consectetur nesciunt impedit distinctio delectus debitis eligendi, laboriosam culpa repellendus in dolorem error mollitia nihil suscipit repudiandae, facilis vitae dolores minus! Similique, dolor recusandae dolores laboriosam, eius adipisci aspernatur deleniti suscipit reiciendis, officia corrupti tempore?</p>
        </div>
      </section>

      <section className="company-overview bg-white px-4 md:px-16 py-8 shadow-md rounded-lg">
        <div className="overview mb-8">
          <h2 className="text-2xl font-base text-black">Company Overview</h2>
          <ul className="mt-4 space-y-2">
            <li><strong>Founded:</strong> 2014</li>
            <li><strong>Location:</strong> KTM, Nepal</li>
            <li><strong>Employees:</strong> 300+</li>
            <li><strong>Product count:</strong> 10k+</li>
            <li><strong>Partners:</strong> 20+</li>
            <li><strong>Followers:</strong> 40k+</li>
          </ul>
        </div>

        <div className="profiles grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="profile shipping-profile">
            <h3 className="text-xl font-semibold text-black">Shipping Profile</h3>
            <ul className="mt-2 space-y-1">
              <li>Global shipping services</li>
              <li>Express & standard options</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor suscipit laudantium, eos aperiam eveniet deserunt dicta repudiandae veritatis voluptatem veniam asperiores, unde odit? At harum iure ullam soluta officia.</li>
            </ul>
          </div>
          <div className="profile packaging-profile">
            <h3 className="text-xl font-semibold text-black">Packaging Profile</h3>
            <ul className="mt-2 space-y-1">
              <li>Eco-friendly packaging</li>
              <li>Custom designs</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor suscipit laudantium, eos aperiam eveniet deserunt dicta repudiandae veritatis voluptatem veniam asperiores, unde odit? At harum iure ullam soluta officia.</li>
            </ul>
          </div>
          <div className="profile logistics-profile">
            <h3 className="text-xl font-semibold text-black">Logistics Profile</h3>
            <ul className="mt-2 space-y-1">
              <li>Efficient & timely delivery</li>
              <li>Global tracking options</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor suscipit laudantium, eos aperiam eveniet deserunt dicta repudiandae veritatis voluptatem veniam asperiores, unde odit? At harum iure ullam soluta officia.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoAreWe;
