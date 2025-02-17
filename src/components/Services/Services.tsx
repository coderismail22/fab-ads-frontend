import fb from "@/assets/icons/facebook.png";

const featuredProducts = [
  {
    id: 1,
    title: "Super Old Real User Profile",
    description:
      "(Created 2007-2020) + 2FA Enable + Email Access + Friends (100-5000) + Cookies + Live Ads",
    stock: 27,
    price: 30.0,
    currency: "USD",
    quantity: 1,
    buttonText: "Buy Now",
    icon: fb,
  },
  {
    id: 2,
    title: "Facebook Old Real User Profile",
    description:
      "(Created 2021-2024) + 2FA Enable + Email Access + Friends (20-5000) + Cookies + Live Ads",
    stock: 19,
    price: 20.0,
    currency: "USD",
    quantity: 1,
    buttonText: "Buy Now",
    icon: fb,
  },
  {
    id: 3,
    title: "New Real User Profile",
    description:
      "(Created 2024) + 2FA Enable + Email Access + Friends (20-5000) + Cookies + Live Ads",
    stock: 54,
    price: 5.0,
    currency: "USD",
    quantity: 1,
    buttonText: "Buy Now",
    icon: fb,
  },
];

// Reusable component for product sections
const ProductList = ({ title }: { title: string }) => (
  <div className="my-10 w-full mx-auto overflow-auto">
    <p className="text-center bg-[var(--secondary-color)] text-white py-2 md:text-2xl font-bold rounded-t-2xl">
      {title}
    </p>
    <div>
      {featuredProducts.map((item) => (
        <div
          key={item.id}
          className="border-b pb-2 border-gray-300 transform transition-all delay-100 duration-150 hover:bg-[var(--primary-color)] hover:text-white flex flex-col md:flex-row items-center justify-around"
        >
          <div className="px-4 py-3 w-full md:w-[80%]">
            <div className="flex gap-4 items-center">
              <img src={item.icon} className="md:w-12 w-16" alt="Icon" />
              <div>
                <p>{item.title}</p>
                <p className="text-xs">{item.description}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[20%] mx-5">
            <button className="w-full rounded-lg bg-[var(--secondary-color)] text-white md:p-3 text-[12px] py-3 px-4 md:text-[16px]">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Services = () => {
  const sections = [
    "VERIFIED BUSINESS MANAGERS",
    "VERIFIED/UNVERIFIED BUSINESS MANAGERS (DM1)",
    "FACEBOOK ACCOUNTS",
    "HIGH LIMIT PERSONAL ADS ACCOUNTS",
    "REINSTATE ACCOUNTS (ARI-2LINE)",
  ];

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="text-center">
            <p className="text-xl md:text-4xl font-semibold text-[var(--primary-color)]">
              Featured Accounts – Get Started Instantly!
            </p>
            <p className="text-sm">
              Browse our top-selling Facebook Ads accounts, verified and ready
              to use. Enjoy instant activation, high trust scores, and seamless
              ad approvals.
            </p>
          </div>
          {sections.map((title) => (
            <ProductList key={title} title={title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
