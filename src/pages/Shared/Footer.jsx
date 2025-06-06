import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-200 text-orange-500 p-10">
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Website Logo"
            className="w-30 rounded-full"
          />
          <span className="text-2xl font-bold">CarGo Rentals</span>
        </div>

        <div className="flex gap-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="hover:text-orange-700 transition duration-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-orange-700 transition duration-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-orange-700 transition duration-200" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="hover:text-orange-700 transition duration-200" />
          </a>
        </div>

        <div className="text-sm">
          © {new Date().getFullYear()} CarGo Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

