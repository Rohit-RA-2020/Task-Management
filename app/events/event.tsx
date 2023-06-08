"use client";

import { useEffect, useState } from "react";
import AppwriteConfig from "../constants/appwrite_config";
import Header from "../components/header";
import { Models } from "appwrite";

export default function EventListing() {
  const appwriteConfig = new AppwriteConfig();

  const [events, setEvents] = useState<Models.Document[]>();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getEvents = appwriteConfig.databases.listDocuments(
      `${process.env.NEXT_PUBLIC_DATABASEID}`,
      `${process.env.NEXT_PUBLIC_EVENT_COLLID}`
    );

    getEvents.then(
      function (response) {
        setEvents(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );

    setLoader(false);
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-2 text-center mx-auto py-10">
          All Active Events
        </p>
        {loader ? (
          <p className="mx-auto text-red-700">Loading....</p>
        ) : (
          <div>
            {events &&
              events.map((item) => (
                <div key={item.$id}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
                    <img
                      src="https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?cs=srgb&dl=pexels-joyston-judah-933054.jpg&fm=jpg"
                      alt="Event Image"
                      className="w-full h-56 object-cover object-center"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Event Title
                      </h2>
                      <p className="text-gray-600 text-sm mb-2">
                        Event Description
                      </p>
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 0116-6v12a9 9 0 11-16-6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-500 text-xs">
                          Venue: Event Venue
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 2a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H3zm0 2h14v10H3V4zm6 5a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm0-4a1 1 0 011 1h2a1 1 0 110 2h-2a1 1 0 01-1-1V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-500 text-xs">
                          Audience: General
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-xs">
                          Date: June 15, 2023
                        </p>
                        <div>
                          <button className="bg-[#DB195A] hover:bg-[#881038] text-white font-bold py-2 px-4 rounded mr-2">
                            Register
                          </button>
                          {((JSON.parse(localStorage.getItem("userInfo") || "{}").$id) === item.CreatedBy) ? (
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Edit
                          </button>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
