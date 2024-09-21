import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaYoutube,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-slate-950 text-white p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <FaGoogle size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} />
        </a>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <a href="/home">Home</a>
        <a href="/news">News</a>
        <a href="/about">About</a>
        <a href="/contact">Contact us</a>
        <a href="/team">Our Team</a>
      </div>
      <div className="text-center">
        <p>Copyright © 2024; Design by Bhaskar</p>
      </div>
    </div>
  );
};
