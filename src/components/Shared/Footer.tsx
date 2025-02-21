import logo from "/logo.png";
import email from "@/assets/icons/gmail.png";
import fb from "@/assets/icons/facebook.png";
import insta from "@/assets/icons/instagram.png";
import whatsapp from "@/assets/icons/whatsapp.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 mx-auto">
      <footer className="text-gray-600 body-font">
        <div className="w-10/12  px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img src={logo} className="w-12" alt="" />
              <span className="ml-3 text-xl">Fab-ads</span>
            </a>
            <div className="flex my-3 gap-3">
              <img src={email} className="w-12" alt="" />
              <img src={fb} className="w-12" alt="" />
              <img src={insta} className="w-12" alt="" />
              <img src={whatsapp} className="w-12" alt="" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Skip the hassle and start running ads instantly with our verified
              Facebook Ads accounts and Business Managers. Secure, fast, and
              trusted by marketers worldwide.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                INQUIRIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Shop</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">About Us</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Recomendations
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                HELP
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Guideline</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Blogs</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                POLICIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Shipping and Delivery
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Terms & Conditions
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
