import React from "react";
import hero from "./hero.png";
import { Link } from "react-router-dom";
interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-center">
            World&nbsp;of&nbsp;Finance
          </h1>
          <h2 className="text-3xl font-bold">Data with no news!</h2>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Search relevant financial documents without fear mongering and fake
            news.
          </p>
          <div className="mx-auto lg:mx-0">
            <Link
              to="/finworld/search"
              className="py-5 px-10 text-2xl font-bold text-white bg-sky-500 rounded lg:py-4 hover:opacity-80"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
          <img
            src={hero}
            alt=""
            style={{
              marginTop: "100px",
              borderRadius: "10px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
