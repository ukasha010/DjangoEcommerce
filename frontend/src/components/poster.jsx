import React, { useState, useEffect, useContext } from "react";
import Context from "../context";

const Poster = () => {
  
  const {images, setImages} = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddImages, setShowAddImages] = useState(false);
  const [user, setUser] = useState("admin");

  const timerDelay = 3000; // 3 seconds
  let timer;

  useEffect(() => {
    if (images?.length > 0) {
      // Set up the timer to switch images
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, timerDelay);
    } else {
      // Clear the timer when no images are present
      clearInterval(timer);
    }

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [images]);

  const handleAddImage = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const newImages = [...images];
      for (let i = 0; i < files.length; i++) {
        newImages.push(URL.createObjectURL(files[i]));
      }
      setImages(newImages);
    }

    // Reset the file input
    fileInput.value = null;
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleAddImagesClick = () => {
    setShowAddImages(true);
  };

  const handleCancelAddImages = () => {
    setShowAddImages(false);
  };

  return (
    <div className="w-50 mt-[4rem] p-4">
      {showAddImages ? (
        <div className="pt-[5rem] h-[38rem] items-center justify-center text-center">
          <input
            type="file"
            multiple
            onChange={handleAddImage}
            className="mb-4"
          />
          <button
            onClick={handleCancelAddImages}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {images?.length === 0 && user === "admin" ? (
            <div className=" h-[40rem] items-center justify-center text-center">
              <p className="mt-4 text-gray-600">
                No images to display. Add images below:
              </p>
              <button
                onClick={handleAddImagesClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Images
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {images?.length > 0 && (
        <div className=" items-center justify-center text-center">
          <ul className="flex flex-row">
            {images?.map((image, index) => (
              <li key={index} className="flex items-center mb-2">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="h-10 w-10 mr-4 rounded"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Poster;
