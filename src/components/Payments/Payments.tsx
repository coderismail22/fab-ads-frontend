import rocket from "@/assets/images/rocket.json";
import Lottie from "lottie-react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import visa from "@/assets/icons/visa.png";
import bank from "@/assets/icons/banktransfer.png";
import iban from "@/assets/icons/iban.png";
import mastercard from "@/assets/icons/mastercard.png";
import { SiVisa } from "react-icons/si";
import { RiBankCard2Line, RiBankFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";

const Payments = () => {
  return (
    <div>
      <div className="bg-[#E7F3FB] shadow-sm rounded-xl flex flex-col md:flex-row p-10 md:p-0 items-center md:justify-around justify-center">
        <div className="w-48">
          <Lottie animationData={rocket} loop={true} />
        </div>
        <div className="">
          <p className="text-2xl font-semibold  text-center my-2 text-[#00345B]">
            Contact us to pay using this payment methods
          </p>
          <div className="grid grid-cols-4 gap-4 justify-center items-center my-4">
            <div className="flex justify-center items-center">
              <img
                className="w-full max-w-[64px]"
                src="/visa-mastercard.png"
                alt="Visa"
              />
            </div>

            <div className="flex justify-center items-center">
              <img
                className="w-full max-w-[64px]"
                src="/bank-transfer.png"
                alt="Bank Transfer"
              />
            </div>

            <div className="flex justify-center items-center">
              <img className="w-full max-w-[64px]" src="/wise.png" alt="Wise" />
            </div>

            <div className="flex justify-center items-center">
              <img className="w-full max-w-[64px]" src="/iban.png" alt="IBAN" />
            </div>
          </div>
        </div>
        <div className="">
          <button className="hover:shadow-md inline-flex text-white  bg-[#9810fa] border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded-xl text-lg items-center gap-2">
            <HiOutlineRocketLaunch /> Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
