import React, { useState } from "react";

const Product = () => {
  const [prodQuan, setProdQuan] = useState(0);
  const [number, setNumber] = useState(0);
  // const renderImages = () => {
  //     return images.map((image, index) => (
  //       <div key={index}>
  //         <img
  //           className="h-[17rem] w-[15rem] mb-5"
  //           src={image.preview}
  //           alt={`Preview ${index}`}
  //         />
  //       </div>
  //     ));
  //   };

  const handleIncrement = (e) => {
    e.preventDefault();
    setProdQuan(prodQuan + 1); // Update prodQuan state using setter function
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (prodQuan > 0) {
      setProdQuan(prodQuan - 1); // Update prodQuan state using setter function
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-[25rem] h-screen border-2 border-red-500">
        {/* {renderImages()} */}
      </div>
      <div className="w-[40rem] h-screen border-2 border-red-500">
        <img src="" alt="product" className="h-100 w-100" />
      </div>
      <div className="flex flex-col justify-evenly p-10 w-[40rem] h-screen border-2 border-red-500">
        <h1>product name</h1>
        <h2>product price</h2>
        <form className="flex flex-col justify-evenly" action="">
          <div>
            <span className="mr-4">Size</span>
            <button className=" pt-2 px-4 bg-white text-black border-2 border-gray-200 hover:bg-gray-200">
              S
            </button>
          </div>
          <div className="my-4">
            <span className="mr-4">color</span>
            <button className=" pt-2 px-4 bg-white text-black border-2 border-gray-200 hover:bg-gray-200">
              black
            </button>
          </div>
          <span className="pr-4">Quantity</span>
          <div className="flex flex-row w-[9rem] border-2 border-gray-200">
            <button
              onClick={handleIncrement}
              className="inline-block w-[3rem] pt-2 px-4 bg-white text-black hover:bg-gray-200"
            >
              +
            </button>
            <input
              readOnly
              value={prodQuan}
              onChange={(e)=>setProdQuan(e.target.value)}
              className="inline-block w-[4rem] outline-none border-none styling-none text-center"
              type="number"
            />
            <button
              onClick={handleDecrement}
              className="inline-block w-[2rem] pt-2 pr-4 pl-3 bg-white text-black hover:bg-gray-200"
            >
              -
            </button>
          </div>

          <div className="my-3 flex flex-col">
          <button className="bg-transparent px-9 py-4 border-neutral-400 border-2  hover:text-white hover:shadow-[inset_33rem_0_0_0] hover:shadow-black duration-[400ms,700ms] transition-[color,box-shadow]">
            ADD TO CART
          </button>
          <button className="bg-black mt-4 px-9 py-4 border-black border-2 text-white hover:text-black hover:shadow-[inset_33rem_0_0_0] hover:shadow-white duration-[400ms,700ms] transition-[color,box-shadow]">
            BUY IT NOW
          </button>
          </div>
        </form>
        <div>
          <span>Name</span>
          <span>Description</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
