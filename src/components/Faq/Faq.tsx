import faq from "@/assets/icons/faq.jpg";
const Faq = () => {
  return (
    <div>
      <section className="">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2 className="mb-12 text-xl font-bold text-center md:text-5xl text-[var(--primary-color)]">
            Frequently Asked Questions
          </h2>
          <div className="md:flex overflow-hidden">
            <div className="">
              <div className="w-80 mx-auto">
                <img src={faq} alt="" />
              </div>
            </div>
            <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300">
              <details>
                <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
                  Why you don't provide online instant delivery of the assets?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    We prioritize delivering a personalized experience to our
                    customers, and we believe in the importance of human
                    interaction. This approach allows us to address any
                    questions you may have about the purchase process or our
                    products, ensuring your complete satisfaction when you buy
                    Facebook ad accounts.
                  </p>
                </div>
              </details>
              <details>
                <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
                  Will you send me a how-to-use guide for profiles and BMs?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Certainly, once you make your purchase, you will receive a
                    comprehensive and user-friendly guide that accompanies the
                    products. When you buy Facebook accounts and Business
                    Managers from us, your success is a top priority, and we
                    want to ensure that you have all the resources necessary to
                    maximize the potential of your profiles and Business
                    Managers.
                  </p>
                </div>
              </details>
              <details>
                <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
                  Do you guys offer after sales support?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Absolutely, our primary commitment revolves around providing
                    exceptional after-sales support when you purchase our
                    Facebook ads account for sale. We are consistently
                    accessible to assist you with any concerns or issues that
                    may arise after you’ve made your purchase. Feel free to
                    reach out to us at any time through messaging, knowing that
                    we are here to ensure your satisfaction and success.
                  </p>
                </div>
              </details>
              <details>
                <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
                  We are the ruler?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    Receive heartfelt contributions instantly & straight to your
                    bank. Guests can choose any amount of money to give
                  </p>
                </div>
              </details>
              <details>
                <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
                  What are the Payment Methods available?
                </summary>
                <div className="px-4 pb-4">
                  <p>
                    We offer a variety of convenient payment methods, including
                    Wise, Wire Transfer, Payoneer, Iban, USDT, BTC, and various
                    cryptocurrencies. Our aim is to make the payment process as
                    accessible and hassle-free as possible for you, ensuring a
                    seamless and secure transaction experience when you buy aged
                    Facebook accounts.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
