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
      <div className="bg-white shadow-sm rounded-xl flex flex-col md:flex-row p-10 md:p-0 items-center md:justify-around justify-center">
        <div className="w-52">
          <Lottie animationData={rocket} loop={true} />
        </div>
        <div className="">
          <p className="text-2xl font-semibold text-center my-2">
            Contact us to pay using this payment methods
          </p>
          <div className="flex justify-around my-4">
            <div className="">
              <SiVisa className="text-4xl" />
            </div>

            <div className="">
              <RiBankFill className="text-4xl" />
            </div>

            <div className="">
              <RiBankCard2Line className="text-4xl" />
            </div>

            <div className="">
              <FaCcMastercard className="text-4xl" />
            </div>
          </div>
        </div>
        <div className="">
          <button className="inline-flex text-white  bg-[#9810fa] border-0 py-2 px-12 focus:outline-none hover:bg-indigo-600 rounded-xl text-lg items-center gap-2">
            <HiOutlineRocketLaunch /> Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
