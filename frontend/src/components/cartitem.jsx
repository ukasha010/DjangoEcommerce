import React from 'react'

const CartItem = ({
  prodQuan,
  setProdQuan,
  handleIncrement,
  handleDecrement, }) => {
  return (
    <div className="flex flex-row p-3">
      <div className="">
        <img className=" h-[13rem]" src="/d1.jpeg" alt="" />
      </div>
      <div className="flex flex-col justify-center pl-3 w-full">
        <div>
          <h2 className="font-semibold">dress name</h2>
          <h4>inventoery info</h4>
          <h4>price</h4>
        </div>
        <div className="flex flex-row w-full justify-between pr-8 pt-5">
          <div className="flex flex-row w-[7rem] border-2 border-gray-200 ">
            <button
              onClick={handleIncrement}
              className="inline-block w-[2rem] pt-2 px-4 bg-white text-black hover:bg-gray-200"
            >
              +
            </button>
            <input
              readOnly
              value={prodQuan}
              onChange={(e) => setProdQuan(e.target.value)}
              className="inline-block w-[3rem] pl-4 outline-none border-none styling-none text-center"
              type="number"
            />
            <button
              onClick={handleDecrement}
              className="inline-block w-[2rem] pt-2 pr-3 pl-1 bg-white text-black hover:bg-gray-200"
            >
              -
            </button>
          </div>
          <span className="mx-3 py-1  bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:100%_2px] bg-no-repeat hover:bg-[length:0%_2px] transition-all duration-500 ease-out pb-1 ">
            Remove
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem