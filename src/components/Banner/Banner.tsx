import React from "react";
import bannerImg from "@/assets/images/banner.svg";
import { BiAlarmExclamation } from "react-icons/bi";
import { IoTimerSharp } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { FaDiscord, FaSkype, FaTelegram, FaWhatsapp } from "react-icons/fa";
const Banner = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex md:px-5 py-10 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className=" text-4xl mb-4 font-medium">
              <p className="font-bold text-4xl md:text-6xl text-[var(--primary-color)] mb-4">
                Power Up Your Advertising with{" "}
              </p>
              <p> Premium Facebook Accounts!</p>
            </div>
            <p className=" leading-relaxed">
              Skip the hassle and start running ads instantly with our verified
              Facebook Ads accounts and Business Managers. Secure, fast, and
              trusted by marketers worldwide.
            </p>

            <div className="grid grid-cols-2 gap-2 my-5 ">
              <button className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center">
                <FaTelegram className="text-xl" />
                Telegram
              </button>

              <button className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center">
                <FaWhatsapp className="text-xl" />
                Whatsapp
              </button>

              <button className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center">
                <FaDiscord className="text-xl" />
                Discord
              </button>

              <button className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center">
                <FaSkype className="text-xl" />
                Skype
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 hover:animate-pulse">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={bannerImg}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
