import React, { useState } from 'react'

const UploadPosters = () => {
    const [images, setImages] = useState([]);
    const formData = new FormData();

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        const imageArray = [];
    
        for (let i = 0; i < selectedFiles.length; i++) {
          imageArray.push(selectedFiles[i]);
        }
    
        setImages(imageArray);
      };

      const handleAdd = async () => {
        
    
        images.forEach((image, index) => {
          formData.append(`images${index}`, image);
        });
    
        console.log("Form Data:", Object.fromEntries(formData.entries()));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:8000/products/",
            formData
          );
          console.log(response);
        } catch (error) {
          console.error("Error sending files to server:", error);
        }
      };

  return (
    <div className='flex mt-40  items-center'>
        <div className="mt-40 w-[20rem] overflow-auto">
          {images.map((image, index) => (
            <div key={index}>
              <img
                className="h-[17rem] w-[15rem] mb-5"
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
              />
            </div>
          ))}
        </div>
        <form action="">
        <div>
            <label
              htmlFor="image"
              className="block text-sm text-black  pt-4"
            >
              Choose Posters
            </label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="p-4 mb-2"
            />
          </div>
          <button
            className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
            type="button"
            onClick={handleAdd}
          >
            push form data
          </button>

          <button
            className="mx-2 bg-blue-500 px-2  py-2 text-white hover:bg-green-500 "
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          </form>
    </div>
  )
}

export default UploadPosters