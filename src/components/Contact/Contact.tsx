import { FaDiscord, FaSkype, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="max-w-[80%] mx-auto flex md:px-5 py-10 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className=" text-4xl mb-4 font-medium">
              <p className="font-siliguri text-4xl font-bold text-[var(--primary-color)] ">
                Contact Our Support Team
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 my-5 ">
              <Link
                to="http://t.me/fbbmkinga"
                target="_blank"
                className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
              >
                <FaTelegram className="text-xl" />
                Telegram
              </Link>

              <Link
                to="https://wa.link/e80poh"
                target="_blank"
                className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
              >
                <FaWhatsapp className="text-xl" />
                Whatsapp
              </Link>

              <Link
                to="https://discord.gg/RCAZ4NX5"
                target="_blank"
                className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
              >
                <FaDiscord className="text-xl" />
                Discord
              </Link>

              <Link
                to="#"
                target="_blank"
                className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
              >
                <FaSkype className="text-xl" />
                Skype
              </Link>
            </div>
          </div>
          <div className="w-[40%] hover:animate-pulse flex flex-col items-center ">
            <img
              className="object-cover object-center "
              alt="hero"
              src="/contactImg.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
