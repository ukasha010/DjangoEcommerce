import React, { useContext } from "react";
import Context from "../context";

const UserPoster = () => {

  const {images} = useContext(Context);
  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="h-[42rem] w-screen mb-4"
      />
      <div className="absolute bottom-4 right-4">
        {images.map((_, index) => (
          <span
            key={index}
            className={`inline-block w-4 h-4 rounded-full bg-${
              currentIndex === index ? "gray" : "gray-300"
            } mx-1 cursor-pointer`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default UserPoster;
