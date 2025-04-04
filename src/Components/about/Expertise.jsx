import React from "react";
import pic1 from "../../assets/about/pic1.png";
import pic2 from "../../assets/about/pic2.png";
import pic3 from "../../assets/about/pic3.png";
import pic4 from "../../assets/about/pic4.png";
import pic5 from "../../assets/about/pic5.png";

const Expertise = () => {
  const expertiseCards = [
    {
      id: 1,
      image: pic2,
      title: "Headline comes here",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
    },
    {
      id: 2,
      image: pic3,
      title: "Headline comes here",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
    },
    {
      id: 3,
      image: pic4,
      title: "Headline comes here",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
    },
    {
      id: 4,
      image: pic5,
      // No title or description for the 4th card
    },
  ];

  return (
    <div className="text-white p-8 min-h-screen">
      <div className="max-w-[90%] mx-auto">
        {/* Studio Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Studio Image */}
          <div className="">
            <img src={pic1} alt="Studio" className="w-full h-full" />
          </div>

          {/* Studio Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-['Orbitron'] uppercase mb-0">
              <p className="text-2xl mb-2">Studiosphere</p>
            </h1>
            <div className="flex gap-2 text-sm text-white mb-3 mt-0">
              <span>32 Posts</span>
              <span>3.5k Followers</span>
              <span>260 Following</span>
            </div>
            <p className="text-white mt-2 mb-4">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <button className="text-white hover:text-white transition-colors">
              More about me
            </button>
          </div>
        </div>

        {/* Expertise Section */}
        <div>
          <h2 className="text-2xl font-['Orbitron'] mb-8">
            <p className="mb-4">Check our expertise</p>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseCards.map((card) => (
              <div key={card.id} className="group">
                {card.id === 4 ? (
                  /* Full height image for 4th card without text */
                  <div className="h-full">
                    <img
                      src={card.image}
                      alt="Headline feature"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  /* Normal cards with image and text */
                  <>
                    <div className="relative overflow-hidden mb-3">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-['Orbitron'] mb-2">
                      <p className="text-[18px] font-bold">{card.title}</p>
                    </h3>
                    <div className="max-w-xs">
                      <p className="text-white text-sm font-normal mb-2">
                        {card.description}
                      </p>
                      <p className="text-sm text-white font-normal hover:text-white transition-colors">
                        Read More
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;