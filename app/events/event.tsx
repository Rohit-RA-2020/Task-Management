"use client";

import { useEffect, useState } from "react";
import AppwriteConfig from "../constants/appwrite_config";
import Header from "../components/header";
import { Models } from "appwrite";
import {MdOutlinePlace} from 'react-icons/md';
import { IoIosPeople } from "react-icons/io";

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
          <div className="py-10">
            {events &&
              events.map((item) => (
                <div key={item.$id} className="py-10">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
                    <img
                      src={item.BannerUrl}
                      alt="Event Image"
                      className="w-full h-56 object-cover object-center"
                    />
                    <div className="p-4">
                      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                        {item.EventName}
                      </h2>
                      <p className="text-gray-600 text-2xl mb-2">
                        {item.Description}
                      </p>
                      <div className="flex items-center mb-2">
                        <MdOutlinePlace className="mr-2" size="30" />
                        <p className="text-gray-500 text-xl">
                          Type: {item.Venue}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <IoIosPeople className="mr-2" size="30"/>
                        <p className="text-gray-500 text-xl">
                          Audience: {item.Audience}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-l">
                          Date: {item.Date}
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
