import React from "react";
import "../App.css";
import { FaRegStar } from "react-icons/fa";

const ReviewPage = () => {
  return (
    <div className="  w-screen py-5 px-auto  ">
      <div className="flex flex-row items-center justify-center py-5" >
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </div>
      
      <div className="header">
        <ul>
            <li><button>Write a Review</button></li>
            <li>Powere</li>
        </ul>
        <p>Reviews 0</p>
        <span>Powered by STAMPED</span>
      </div>
      <div className="main">
        <p>Be the first to review this item.</p>
      </div>
    </div>
  );
};

export default ReviewPage;