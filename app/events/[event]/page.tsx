"use client";

import { useEffect, useState } from "react";
import { ID, Models } from "appwrite";
import AppwriteConfig from "../../constants/appwrite_config";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import swal from "sweetalert";

export default function Event({ params }: { params: { event: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [docs, setDocs] = useState<Models.Document>();
  const [loader, setLoader] = useState(false);

  const [reg, setReg] = useState<string[]>();
  const [isReg, setIsReg] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoader(true);
    const getDocs = appwriteConfig.databases
      .getDocument(
        `${process.env.NEXT_PUBLIC_DATABASEID}`,
        `${process.env.NEXT_PUBLIC_EVENT_COLLID}`,
        params["event"]
      )
      .then(
        function (response) {
          setDocs(response);
          setReg(response["registrations"]);

          if (
            response["registrations"].includes(
              JSON.parse(localStorage.getItem("userInfo") || "{}").$id
            )
          ) {
            setIsReg(true);
          }
        },
        function (error) {
          console.log(error);
        }
      );
    setLoader(false);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      {loader ? (
        <p className="mx-auto text-red-700">Loadings....</p>
      ) : (
        <>
          <div className="bg-[#f8f9f9] w-90 mx-2 sm:w-3/5 sm:mx-auto rounded-xl p-2 mb-2 sm:mb-4">
            <img
              src={docs && docs["url"]}
              alt="Event Image"
              className="object-cover object-center rounded"
            />
            <div className="w-3/4 p-5">
              <h1 className="text-black font-bold text-xl sm:text-4xl">
              {docs && docs["eventname"]}
              </h1>
              <p className="text-gray-800 py-2 text-md sm:text-lg">
                Hosted by {docs && docs["hostname"]}
              </p>
              <div className="flex flex-col sm:flex-row justify-between w-full py-1">
                <div className="flex flex-row pb-2">
                  <div>
                    <h3 className="text-gray-800 font-bold text-md sm:text-lg">
                    {docs && docs["eventdate"]}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row pb-2">
                  {/* //Here comes the icon for location */}
                  <div>
                    <h3 className="text-black font-bold text-md sm:text-lg">
                    {docs && docs["address"]}
                    </h3>
                    <span className="text-gray-700">{docs && docs["city"]}, {docs && docs["state"]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4"></div>
          </div>
          <div className=" w-full sm:w-3/5 mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="w-90 mx-2  sm:w-2/3 sm:mx-0">
              <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4">
                <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
                  Registration
                </h4>
                <hr />
                <p className="text-grey-800 py-4 px-3 text-md sm:text-lg">
                  Hello! To joint the event, please register below.
                </p>
                {isReg ? (
                  <button
                    className="bg-[#DB195A] text-white w-full rounded-lg p-1 text-md sm:text-lg hover:bg-[#990e3c] flex justify-center"
                    onClick={() => {
                      alert("Your Are alredy registered");
                    }}
                  >
                    Registered
                  </button>
                ) : (
                  <button
                    className="bg-[#DB195A] text-white w-full rounded-lg p-1 text-md sm:text-lg hover:bg-[#990e3c] flex justify-center"
                    onClick={() => {
                      reg?.push(
                        JSON.parse(localStorage.getItem("userInfo") || "{}").$id
                      );
                      appwriteConfig.databases
                        .updateDocument(
                          `${process.env.NEXT_PUBLIC_DATABASEID}`,
                          `${process.env.NEXT_PUBLIC_EVENT_COLLID}`,
                          params["event"],
                          {
                            registrations: reg,
                          }
                        )
                        .then(() => {
                          appwriteConfig.regDb
                            .createDocument(
                              `${process.env.NEXT_PUBLIC_REGDB}`,
                              params["event"],
                              JSON.parse(
                                localStorage.getItem("userInfo") || "{}"
                              ).$id,
                              {
                                name: JSON.parse(
                                  localStorage.getItem("userInfo") || ""
                                ).name,
                                email: JSON.parse(
                                  localStorage.getItem("userInfo") || ""
                                ).email,
                              }
                            )
                            .then((res) => {
                              router.push("/events/sucessreg");
                            });
                        });
                    }}
                  >
                    Register
                  </button>
                )}
              </div>
              <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2">
                <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
                  About Event
                </h4>
                <hr />
                <div className="px-3">
                  <p className="text-grey-800 py-2 text-md sm:text-lg">
                  {docs && docs["description"]}
                  </p>
                  <p className="text-black font-bold py-2 text-md sm:text-lg">
                    Venue: Nagpur
                  </p>
                  <p className="text-black font-bold py-2 text-md sm:text-lg">
                    Date: 19th Feb 2023
                  </p>
                  <p className="text-black font-bold py-2 text-md sm:text-lg">
                    Time: 02:00 PM Onwards
                  </p>
                  <p className="text-black py-2 text-md sm:text-lg">
                    Register above and RSVP NOW for an afternoon of meaningful
                    networking, engaging interactions, fun-filled activities,
                    and delicious food.
                  </p>
                  <div className="flex flex-col py-2 text-md sm:text-lg">
                    <p className="text-black"> Follow us on-</p>
                    <Link href="#" className="text-[#e56589]">
                      Twitter
                    </Link>
                    <Link href="#" className="text-[#e56589]">
                      Telegram
                    </Link>
                    <Link href="#" className="text-[#e56589]">
                      LinkedIn
                    </Link>
                    <Link href="#" className="text-[#e56589]">
                      Discord
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-90 mx-2  sm:w-1/3 sm:mx-0">
              <div className="bg-[#f8f9f9]  mx-auto rounded-xl p-2 mb-2 sm:mb-4">
                <h3 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
                  Location
                </h3>
                <hr />
                {/* //show google maps here */}
                <div>
                  <p className="text-gray-700 font-bold p-2 text-md sm:text-lg">
                  {docs && docs["address"]}
                  </p>
                  <p className="text-black-700 p-2 text-md sm:text-lg">
                  {docs && docs["city"]}, {docs && docs["state"]}, {docs && docs["country"]} - {docs && docs["postal"]}
                  </p>
                </div>
              </div>
              <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4 divide-black">
                <h3 className="text-gray-700 px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
                  Agenda
                </h3>
                
                <hr className="divide-black" />
                
                <p className="text-black-700 p-2 text-md sm:text-lg">
                {docs && docs["agenda"]}
                  </p>
                
              </div>
              <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4 divide-black">
                <h3 className="text-gray-700 px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
                  Hosts
                </h3>
                
                <hr className="divide-black" />
                
                <p className="font-bold text-gray-600 p-2 text-md sm:text-lg">
                  Zeeve
                </p>
                <button className="w-full bg-[#DB195A] p-1 text-gray-200 hover:bg-[#990e3c] flex justify-center rounded-lg text-md sm:text-lg">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
