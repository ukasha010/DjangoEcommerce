import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Context from "../context";

const Navbar = ({ setShowCart }) => {
  const [srchDisplay, setSrchDisplay] = useState("display-none");
  const [show, setShowSrch] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);



  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
    setServicesOpen(false);
  };

  const toggleServices = () => {
    setServicesOpen(!isServicesOpen);
    setProductsOpen(false);
  };

  const handleSrchClick = (e) => {
    e.preventDefault();
    setSrchDisplay("display");
  };

  const handleSkillClick = (e) => {
    e.preventDefault();
    navigate("/skillAssesment");
  };

  const handleCareerClick = (e) => {
    e.preventDefault();
    navigate("/careers");
  };

  return (
    <div className="fixed right-0 left-0 top-0 pt-2 z-10 bg-gray-900 text-yellow-500 h-[30vm]">
      <div className="flex flex-row justify-end ">
        <CiSearch
          className="text-[2rem] mx-2"
          onClick={() => setShowSrch(true)}
        />
        <BsCart4 onClick={(e) => setShowCart(true)} className="text-[2rem] mx-2" />
      </div>
      <ul className="flex flex-row w-[99vm] itmes-center justify-center font-semibold border-b-2 pb-1">
        <li className="mx-3 py-1 bg-left-bottom bg-gradient-to-r from-yellow-500 to-yellow-500 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-100 ease-out pb-1 ">
          New Arivals
        </li>
        <li className="mx-3 py-1 bg-left-bottom bg-gradient-to-r from-yellow-500 to-yellow-500 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-100 ease-out pb-1 ">
          kids
        </li>
        <li className="mx-3 py-1 bg-left-bottom bg-gradient-to-r from-yellow-500 to-yellow-500 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-100 ease-out pb-1 ">
          Abaya
        </li>
        <li className="mx-3 py-1 bg-left-bottom bg-gradient-to-r from-yellow-500 to-yellow-500 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-100 ease-out pb-3 ">
          Formal
        </li>
      </ul>
      {show && (
        <div className="flex flex-row  justify-between h-[4.5rem] items-center">
          <div>
            <label htmlFor="srch">
              <CiSearch className="text-[2rem] mx-2 inline-flex  " />
            </label>
            <input autoFocus className='outline-none border-0 text-2xl bg-gray-900' type="text" placeholder="search here.." id="srch" />
          </div>
          <RxCross1
            onClick={() => setShowSrch(false)}
            className="text-[2rem] mx-2 inline active:border-none "
          />
        </div>
      )}

    </div>
  );
};

export default Navbar;
