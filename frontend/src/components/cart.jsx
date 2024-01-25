import React, { useContext } from "react";
import Context from "../context";
import { RxCross1 } from "react-icons/rx";
import CartItem from "./cartitem";

const Cart = ({
  setShowCart,
  prodQuan,
  setProdQuan,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex justify-end w-screen z-20 fixed top-0 bg-[#000a]">
      {/* <!-- drawer component --> */}
      <div class=" z-20 w-[30rem]  h-screen bg-white ">
        <div className="flex flex-row h-[5rem] items-center justify-between px-5 py-4 border-b-2 ">
          <h5
            id="drawer-right-label"
            class="inline-flex items-center text-base font-semibold text-gray-500 "
          >
            Cart
          </h5>
          <RxCross1
            onClick={() => setShowCart(false)}
            className="text-[1rem] mx-2 inline active:border-none "
          />
        </div>

        <div class="flex flex-col p-5 h-[34rem] overflow-auto">
          <CartItem
            prodQuan={prodQuan}
            setProdQuan={setProdQuan}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
          <CartItem
            prodQuan={prodQuan}
            setProdQuan={setProdQuan}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
          <CartItem
            prodQuan={prodQuan}
            setProdQuan={setProdQuan}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        </div>
        <div className="flex flex-col border-t-2">
          <input className="ml-5  text-xl outline-none p-3 w-full" type="text" placeholder="Add Order Note" />
          <button className="bg-black mt-2 mx-6 px-9 py-4 border-black border-2 text-white hover:text-black hover:shadow-[inset_33rem_0_0_0] hover:shadow-white duration-[400ms,700ms] transition-[color,box-shadow]">
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
