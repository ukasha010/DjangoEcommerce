import React from "react";

function Categories() {
  return (
    <div className="flex flex-col items-center font-semibold pt-20 bg-gray-800 text-yellow-500">
      <h1>Shop By Categories</h1>
      <div className="flex flex-row">
        <div className="group flex flex-col m-5  items-center overflow-hidden">
          <img
            className=" w-[22rem] h-[33rem] group-hover:scale-150 transition-all duration-5000 "
            src="/skin.jpg"
            alt=""
          />
          <h2 className="absolute top-[81rem] my-5 text-yellow-500 font-semibold">
            Skin Care
          </h2>

          <button class="absolute top-[84rem] bg-white px-9 py-4 border-white border-2 text-black group hover:bg-transparent duration-700 transition-all">
            SHOP NOW
          </button>
        </div>
        <div className="group flex flex-col m-5  items-center overflow-hidden">
          <img
            className=" w-[22rem] h-[33rem] group-hover:scale-150 transition-all duration-5000 "
            src="/skin.jpg"
            alt=""
          />
          <h2 className="absolute top-[81rem] my-5 text-yellow-500 font-semibold">
            Skin Care
          </h2>

          <button class="absolute top-[84rem] bg-white px-9 py-4 border-white border-2 text-black group hover:bg-transparent duration-700 transition-all">
            SHOP NOW
          </button>
        </div>
        <div className="group flex flex-col m-5  items-center overflow-hidden">
          <img
            className=" w-[22rem] h-[33rem] group-hover:scale-150 transition-all duration-5000 "
            src="/skin.jpg"
            alt=""
          />
          <h2 className="absolute top-[81rem] my-5 text-yellow-500 font-semibold">
            Skin Care
          </h2>

          <button class="absolute top-[84rem] bg-white px-9 py-4 border-white border-2 text-black group hover:bg-transparent duration-700 transition-all">
            SHOP NOW
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Categories;
