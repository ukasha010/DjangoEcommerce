import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className='flex flex-col items-center justify-center border-t-2'>
        <div className='flex flex-row w-[98rem] h-[17rem] justify-evenly my-3 pt-5'>
            <ul>
                <li className='font-semibold'>Information</li>
                <li>About us</li>                
                <li>Locations</li>
                <li>Contact us</li>
                <li>FAQ</li>
                <li>Blog</li>
            </ul>
            <ul>
                <li className='font-semibold'>Policies</li>
                <li>Privacy Policy</li>
                <li>Exchange Policy</li>
                <li>Terms of service</li>
                <li>Shipping Policy</li>
            </ul>
            <ul className=''>
                <li className='font-semibold'>Social Media</li>
                <li className='my-3 text-xl'><FaFacebook /></li>
                <li className='my-3 text-xl'><FaInstagram /></li>
                <li className='my-3 text-xl'><FaYoutube /></li>
            </ul>
            <ul>
                <li className='font-semibold'>Track Your Order</li>
            </ul>
            <ul>
                <li className='font-semibold'>Get In Touch</li>
            </ul>
        </div>
        <h1 className='w-[98rem] text-center pb-10 pt-4 border-t-2'>
            &copy; name
        </h1>
    </div>
  )
}

export default Footer