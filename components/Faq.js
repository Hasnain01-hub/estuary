import React, { useRef, useState } from "react";

const Accordion = ({ handleChange, formState, handleSubmit }) => {
  const { name, email, message } = formState;
  const form = useRef();
  return (
    <section className="relative  overflow-hidden bg-white pt-10 pb-12 lg:pt-[70px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Estuary Support Center
              </span>
              <h2 className="mb-4 text-2xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Any Questions? Look Here
              </h2>
              <p className="text-base px-2 sm:px-0 text-body-color">
                Need help with your Estuary Experience? Check out our FAQ down
                below!
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="What is Estuary?"
              text="Estuary is a subscription-based marketplace designed to provide buyers the most affordable prices and equip sellers with the tools to sell smarter. Our subscription-based pricing model empowers sellers to achieve stronger margins and provides buyers with more affordable pricing. Additionally, our seller inventory tool simplifies the entire selling process for everyone, regardless of their level of experience."
            />
            <AccordionItem
              header="How do I create an account?"
              text="Creating an Estuary account is pretty simple. To get started, all you have to so is click the log in button in the top corner! It's that easy."
            />
            <AccordionItem
              header="How can I sell my shoes on Estuary?"
              text="To sell your shoes, head to your profile and click the sell button! With that being said, in order to sell your shoes with Estuary, and get paid accordingly, you must first have an account with us."
            />
            <AccordionItem
              header="Where can I find Estuary on social media?"
              text="You can find Estuary on social media by clicking the links at the bottom of this page, OR by searching our handle @estuaryshoes!"
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="How does Estuary verify sneakers?"
              text="When you list your inventory with Estuary, your sneakers are automatically verified by our verification partner, CheckCheck. CheckCheck uses AI and human legit checkers to determine the authenticity. With over 100,000 checks in its existence, CheckCheck verifies sneakers with 99% accuracy, and their AI has a self learning algorithm, meaning it's getting better by the day!"
            />
            <AccordionItem
              header="Does Estuary sell used sneakers?"
              text="As of right now,  all of the inventory listed on Estuary are new! Stay tuned for future updates as we are actively working to expand our capabilities."
            />
            <AccordionItem
              header="What are Estuary's return and refund policies?"
              text="After receiving an order, you have up to 48 hours to contact us about any complaints or issues with the sneakers. After 48 hours, the transaction is finalized. If the complaint is validated, then you are eligible for a 100% refund on the specific sneakers purchased.
              ‍
              We do not offer any returns or exchanges on our website.
              
              To learn more, view our Terms of Service"
            />

            <AccordionItem
              header="Does Estuary sell other items?"
              text="At this time Estuary only sells sneakers on our platform. Stay tuned for future updates as we are actively working to expand our capabilities"
            />
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1508.65"
              y1="2142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3056D3" stop-opacity="0.36" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.2" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.046144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* contact */}
      <div className="max-w-screen-xl mx-auto py-10 lg:py-14">
        <div className="p-10 sm:p-12 md:p-16 bg-primarycolor text-gray-100 rounded-lg relative">
          <div tw="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-4xl font-bold">
              Don't see your question in our FAQ? Contact us!
            </h2>
            <form ref={form} className="mt-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="sm:w-5/12 flex flex-col">
                  <div className="relative py-5 mt-6">
                    <label
                      className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                      htmlFor="name-input"
                    >
                      Your Name
                    </label>
                    <input
                      className="pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                      id="name-input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => handleChange(e)}
                      placeholder="E.g. Estuary"
                    />
                  </div>
                  <div className="relative py-5 mt-6">
                    <label
                      className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                      htmlFor="email-input"
                    >
                      Your Email Address
                    </label>
                    <input
                      className=" pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                      id="email-input"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => handleChange(e)}
                      placeholder="E.g. shopestuary.biz@gmail.com"
                    />
                  </div>
                </div>
                <div className="sm:w-5/12 flex flex-col">
                  <div className="relative py-5 mt-6" tw="flex-1">
                    <label
                      className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                      htmlFor="name-input"
                    >
                      Your Message
                    </label>
                    <textarea
                      className="h-24 sm:h-full resize-none w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                      id="message-input"
                      name="message"
                      value={message}
                      onChange={(e) => handleChange(e)}
                      placeholder="E.g. Details about your message"
                    />
                  </div>
                </div>
              </div>

              <button
                className="w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primarycolor rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl"
                type="button"
                onClick={(e) => handleSubmit(e)}
                value="Submit"
              >
                Submit
              </button>
            </form>
          </div>
          {/* <SvgDotPattern1 /> */}
        </div>
      </div>
    </section>
  );
};

export default Accordion;

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary">
          <svg
            className={`duration-200 ease-in-out fill-primary stroke-primary ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-black">{header}</h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
      </div>
    </div>
  );
};
