"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import {AppwriteConfig} from "../../constants/appwrite_config";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import swal from "sweetalert";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function Event({ params }: { params: { event: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [docs, setDocs] = useState<Models.Document>();
  const [loader, setLoader] = useState(false);

  const [reg, setReg] = useState<string[]>();
  const [isReg, setIsReg] = useState(false);

  const [sponsors, setSponsors] = useState<Models.Document[]>();

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
    appwriteConfig.databases
      .listDocuments(`${process.env.NEXT_PUBLIC_SPODB}`, params["event"])
      .then(
        function (response) {
          setSponsors(response.documents);
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
                    <span className="text-gray-700">
                      {docs && docs["city"]}, {docs && docs["state"]}
                    </span>
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
                    className="bg-[#f02e65] text-white w-full rounded-lg p-1 text-md sm:text-lg hover:bg-[#990e3c] flex justify-center"
                    onClick={() => {
                      alert("Your Are already registered");
                    }}
                  >
                    Registered
                  </button>
                ) : (
                  <button
                    className="bg-[#f02e65] text-white w-full rounded-lg p-1 text-md sm:text-lg hover:bg-[#990e3c] flex justify-center"
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
                                confirm: ""
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

                <div className="px-3 py-5">
                  <ReactMarkdown remarkPlugins={[gfm]}>
                    {docs && docs["description"]}
                  </ReactMarkdown>
                  <h1 className="text-lg font-bold py-5 text-gray-700">
                    Our Sponsors
                  </h1>
                  <div className="mx-auto">
                    {sponsors &&
                      sponsors.map((sponsor) => (
                        <div key={sponsor.$id}>
                          <div>
                            <a href={`${sponsor.url}`} target="_blank">
                              {sponsor.name}
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col text-md sm:text-lg py-5">
                    <p className="text-black text-xl font-bold flex justify-center py">
                      {" "}
                      Follow us on
                    </p>
                    <span className="flex justify-center py-5">
                      <a href={`${docs && docs["website"]}`} target="_blank">
                        <TbWorldWww fontSize={50} className="px-2" />
                      </a>
                      <a href={`${docs && docs["twitter"]}`} target="_blank">
                        <AiOutlineTwitter fontSize={50} className="px-2" />
                      </a>
                      <a href={`${docs && docs["linkedin"]}`} target="_blank">
                        <AiFillLinkedin fontSize={50} className="px-2" />
                      </a>
                      <a href={`${docs && docs["instagram"]}`} target="_blank">
                        <AiOutlineInstagram fontSize={50} className="px-2" />
                      </a>
                    </span>
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
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="100%"
                      id="gmap_canvas"
                      src={`https://maps.google.com/maps?q=${
                        docs && docs["postal"]
                      }&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 font-bold p-2 text-md sm:text-lg">
                    {docs && docs["address"]}
                  </p>
                  <p className="text-black-700 p-2 text-md sm:text-lg">
                    {docs && docs["city"]}, {docs && docs["state"]},{" "}
                    {docs && docs["country"]} - {docs && docs["postal"]}
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
                  {docs && docs["hostname"]}
                </p>
                <button
                  className="w-full bg-[#f02e65] p-1 text-gray-200 hover:bg-[#990e3c] flex justify-center rounded-lg text-md sm:text-lg"
                  onClick={() => {
                    return swal({
                      title: `${docs && docs["email"]}`,
                      text: "Event Support Email",
                      icon: "info",
                    });
                  }}
                >
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
