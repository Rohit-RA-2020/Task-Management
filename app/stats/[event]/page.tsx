"use client";

import { useEffect, useState } from "react";
import { ID, Models } from "appwrite";
import AppwriteConfig from "../../constants/appwrite_config";

import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

export default function Stat({ params }: { params: { reg: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [loader, setLoader] = useState(false);

  const [reg, setReg] = useState<Models.Document[]>();

  const router = useRouter();

  useEffect(() => {
    setLoader(true);
    const getRegs = appwriteConfig.databases
      .listDocuments(
        `6486b2d946e0fe5fdbf4`,
        `6486ef21982b518ccb6b`
      )
      .then(
        function (response) {
          setReg(response.documents);
          console.log(response)
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
        <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
          All Active Registrations
        </p>
        {loader ? (
          <p className="mx-auto text-red-700">Loading....</p>
        ) : (
          <div className="py-10">
            {reg &&
              reg.map((item) => (
                <div key={item.$id} className="py-2">
                  <section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                          {item.name}
                        </h1>
                        <p className="mb-8 leading-relaxed">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
