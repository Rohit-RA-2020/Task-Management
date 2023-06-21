"use client";
import {AppwriteConfig} from "../../constants/appwrite_config";
import { useState } from "react";

export default function MagicUrl() {
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    console.log("value is:", event.target.value);
  };

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const appwriteConfig = new AppwriteConfig();
    appwriteConfig.magicUrlLogin(email);
  };

  return (
    <div className="content-center justify-center mu-auto">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-black">
              Tired of remembering passwords
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-800">
              Magic URL is a way which works just like magic 🪄. Enter your
              email-id. Click on the link we sent to your email and voila🥳
            </p>
            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-medium text-gray-300 dark:text-black"
                >
                  Email address
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-balck"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  onChange={handleChange}
                  value={email}
                  className="block p-3 pl-10 w-full text-sm text-gray-300 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                />
              </div>
              <div>
                <button
                  onClick={buttonHandler}
                  className="py-3 px-10 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-[#f02e65] border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-800 newsletter-form-footer dark:text-gray-800">
              We care about the protection of your data.{" "}
              <a
                href="#"
                className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read our Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
