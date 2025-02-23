import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const HomePageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/categories");
        setCategories(data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Something went wrong while fetching the categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          width="46"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-10 md:mt-36">
      <div className="text-center">
        <p className="text-xl md:text-4xl font-semibold text-[#ffc727]">
          Business Manager
        </p>
        <p className="text-sm">
          Choose from our wide range of verified and reinstated accounts to get
          started instantly.
        </p>
      </div>

      <div className="grid my-5 grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {categories?.map((item) => (
          <Link
            // If clicked on the link, scroll to the exact service section.
            // This is to make the user experience better.
            // Category name and the service section have same name.
            to={`#${item?.name.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById(
                item?.name.replace(/\s+/g, "-").toLowerCase()
              );
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            key={item?._id}
            className="bg-[#E7F3FB] shadow-sm md:px-5 px-1 rounded-lg border-2 md:py-5 hover:bg-[#ffc727] border-blue-300 hover:border-blue-500 hover:shadow-lg flex gap-2 items-center transform transition ease-in-out delay-100 duration-200 hover:scale-105"
          >
            <img src={item?.img} className="w-6 md:w-12" alt="" />
            <p className="text-[8px] md:text-sm my-2 md:font-semibold">
              {item?.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePageCategory;
