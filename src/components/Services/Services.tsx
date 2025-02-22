import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
}

const ProductList = ({
  _id,
  title,
  products,
}: {
  _id: string;
  title: string;
  products: Service[];
}) => {
  if (products.length === 0) return null;

  return (
    <div className="my-10 w-full mx-auto overflow-auto">
      <p className="text-center bg-[var(--secondary-color)] text-white py-2 md:text-2xl font-bold rounded-t-2xl">
        {title}
      </p>
      <div>
        {products.map((item, index) => (
          <div
            key={index}
            className="border-b pb-2 border-gray-300 transform transition-all delay-100 duration-150 hover:bg-[var(--primary-color)] hover:text-white flex flex-col md:flex-row items-center justify-around"
          >
            <div className="px-4 py-3 w-full md:w-[80%]">
              <div className="flex gap-4 items-center">
                <img src={item.image} className="md:w-12 w-16" alt="Icon" />
                <div>
                  <p className="text-black">{item.title}</p>
                  <p className="text-xs text-black">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="w-[100px] md:w-[20%] mx-5">
              <Link
                to={`/services/${item._id}`}
                className="w-full rounded-lg bg-[var(--secondary-color)] text-white md:p-3 text-[12px] py-3 px-4 md:text-[16px]"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/services");
      const fetchedServices: Service[] = data?.data || [];

      // Extract unique categories
      const allCategories = new Set<string>();
      fetchedServices.forEach((service) => {
        service.category.forEach((cat) => allCategories.add(cat));
      });

      setCategories([...allCategories]);
      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Something went wrong while fetching the services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="text-center">
            <p className="text-xl md:text-4xl font-semibold text-[var(--primary-color)]">
              Featured Services – Get Started Instantly!
            </p>
            <p className="text-sm">
              Browse our top services across various platforms. Boost your
              marketing efforts today!
            </p>
          </div>

          {categories.map((category) => (
            <ProductList
              key={category}
              title={category}
              products={services.filter((service) =>
                service.category.includes(category)
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
