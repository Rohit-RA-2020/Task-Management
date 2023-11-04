"use client";

import { useEffect, useState } from "react";
import { AppwriteConfig, ServerConfig } from "../constants/appwrite_config";
import Header from "../components/header";
import { Models, Client } from "appwrite";
import { MdOutlinePlace } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { useRouter } from "next/navigation";


export default function MyEvents() {
  const appwriteConfig = new AppwriteConfig();
  const server = new ServerConfig();

  const [events, setEvents] = useState<Models.Document[]>();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoader(true);
    appwriteConfig.databases
      .listDocuments(
        `${process.env.NEXT_PUBLIC_DATABASEID}`,
        `${process.env.NEXT_PUBLIC_EVENT_COLLID}`
      )
      .then(
        function (response) {
          setEvents(response.documents);
        },
        function (error) {
          console.log(error);
        }
      );

    const unsubscribe = appwriteConfig.client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_DATABASEID}.collections.${process.env.NEXT_PUBLIC_EVENT_COLLID}.documents`,
      (response) => {
        appwriteConfig.databases
          .listDocuments(
            `${process.env.NEXT_PUBLIC_DATABASEID}`,
            `${process.env.NEXT_PUBLIC_EVENT_COLLID}`
          )
          .then(
            function (response) {
              setEvents(response.documents);
            },
            function (error) {
              console.log(error);
            }
          );
      }
    );

    setLoader(false);
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
          My Active Events
        </p>
        {loader ? (
          <p className="mx-auto text-red-700">Loading....</p>
        ) : (
          <div className="py-10">
            {events &&
              events.map((item) =>
                JSON.parse(localStorage.getItem("userInfo") || "{}").$id ===
                item.created ? (
                  <div key={item.$id} className="py-2">
                    <section className="text-gray-600 body-font">
                      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                          <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src={item.url}
                          />
                        </div>
                        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            {item.eventname}
                          </h1>
                          <p className="mb-8 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center mb-2">
                            <MdOutlinePlace
                              className="mb-8 leading-relaxed"
                              size="30"
                            />
                            <p className="mb-8 leading-relaxed mx-2">
                              Type: {item.type}
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <IoIosPeople
                              className="mb-8 leading-relaxed"
                              size="30"
                            />
                            <p className="mb-8 leading-relaxed mx-2">
                              Audience: {item.audience}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                              onClick={() => {
                                router.push(`/events/${item.$id}`);
                              }}
                            >
                              Register
                            </button>
                            {JSON.parse(
                              localStorage.getItem("userInfo") || "{}"
                            ).$id === item.created ? (
                              <div>
                                <button
                                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                                  onClick={() => {
                                    router.push(`/stats/${item.$id}`);
                                  }}
                                >
                                  View Registrations
                                </button>
                                <button
                                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                                  onClick={() => {
                                    server.databases
                                      .deleteCollection(
                                        `${process.env.NEXT_PUBLIC_REGDB}`,
                                        `${item.$id}`
                                      )
                                      .then(() => {
                                        server.databases
                                          .deleteCollection(
                                            `${process.env.NEXT_PUBLIC_SPODB}`,
                                            `${item.$id}`
                                          )
                                          .then(() => {
                                            appwriteConfig.databases.deleteDocument(
                                              `${process.env.NEXT_PUBLIC_DATABASEID}`,
                                              `${process.env.NEXT_PUBLIC_EVENT_COLLID}`,
                                              `${item.$id}`
                                            );
                                          });
                                      });
                                  }}
                                >
                                  Delete Event
                                </button>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div key={item.$id}></div>
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
}
