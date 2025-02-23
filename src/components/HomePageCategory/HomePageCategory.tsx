import fb from "@/assets/icons/facebook.png";
import verified from "@/assets/icons/verify.png";
import insta from "@/assets/icons/instagram.png";
import gmail from "@/assets/icons/gmail.png";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

// const categories = [
//   {
//     id: 1,
//     name: "Facebook Account",
//     icon: fb,
//   },
//   {
//     id: 2,
//     name: "Reinstated Profiles ARI (2-Line)",
//     icon: fb,
//   },
//   {
//     id: 3,
//     name: "Double Reinstated Accounts SARI (3-Line)",
//     icon: fb,
//   },
//   {
//     id: 4,
//     name: "High Limit Personal Ads Accounts",
//     icon: fb,
//   },
//   {
//     id: 5,
//     name: "Facebook Fanpages",
//     icon: fb,
//   },
//   {
//     id: 6,
//     name: "Verified Business Managers",
//     icon: verified,
//   },
//   {
//     id: 7,
//     name: "Verified/Unverified Business Managers (BM1)",
//     icon: verified,
//   },
//   {
//     id: 8,
//     name: "Verified/Unverified Business Managers (BM3)",
//     icon: verified,
//   },
//   {
//     id: 9,
//     name: "Verified/Unverified Business Managers (BM5)",
//     icon: verified,
//   },
//   {
//     id: 10,
//     name: "Instagram Account",
//     icon: insta,
//   },
//   {
//     id: 11,
//     name: "Email Accounts",
//     icon: gmail,
//   },
// ];

// Fetch categories from the backend
const HomePageCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");
        setCategories(data?.data);
        // console.log("🚀 ~ fetchCategories ~ data?.data:", data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="mt-10 md:mt-36">
      <div className="text-center">
        <p className="text-xl md:text-4xl font-semibold text-[#ffc727]">
          Business Manager{" "}
        </p>
        <p className="text-sm">
          Choose from our wide range of verified and reinstated accounts to get
          started instantly.
        </p>
      </div>

      <div className="grid my-5 grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {categories?.map((item) => (
          <div
            key={item?._id}
            className="bg-[#E7F3FB] shadow-sm md:px-5 px-1 rounded-lg border-2  md:py-5 hover:bg-[#ffc727]  border-blue-300 hover:border-blue-500 hover:shadow-lg flex gap-2 items-center transform transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
            <img src={item?.img} className="w-6 md:w-12" alt="" />
            <p className="text-[8px] md:text-sm  my-2 md:font-semibold">
              {item?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCategory;
