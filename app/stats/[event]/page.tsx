"use client";

interface UserReg {
  name: string;
  email: string;
}

import { useEffect, useState } from "react";
import { ID, Models } from "appwrite";
import AppwriteConfig from "../../constants/appwrite_config";

import CsvDownloader from "react-csv-downloader";

import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
];

export default function Event({ params }: { params: { event: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [docs, setDocs] = useState<Models.Document[]>();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const data: {
    name: string;
    email: string;
  }[] = [];

  const asyncFnComputeDate = () => {
    for (let i = 0; i < docs?.length!; i++) {
      data.push({
        name: docs![i].name,
        email: docs![i].email,
      });
    }
    return Promise.resolve(data);
  };

  useEffect(() => {
    setLoader(true);
    const getDocs = appwriteConfig.databases
      .listDocuments(`${process.env.NEXT_PUBLIC_REGDB}`, params["event"])
      .then(
        function (response) {
          setDocs(response.documents);
        },
        function (error) {
          setDocs([]);
          console.log(error);
        }
      );

    setLoader(false);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-8xl mx-auto">
        <p className="text-2xl font-bold mb-2 flex justify-center mx-auto py-10">
          Active Registrations
        </p>
        {loader ? (
          <p className="mx-auto text-red-700">Loadings....</p>
        ) : (
          <div>
            {docs &&
              docs.map((item) =>
                docs.length !== 0 ? (
                  <div key={item.$id}>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p>{item.name}</p>
                      </div>
                      <div>
                        <span className="text-[#2f394a] cursor pointer">
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="p-4 flex items-center justify-between"
                    key={item.$id}
                  >
                    <div className="text-black">
                      <p>No Registrations</p>
                    </div>
                  </div>
                )
              )}
          </div>
        )}
        <p className="text-lg mb-5 flex justify-center mx-auto text-blue">
        <CsvDownloader datas={asyncFnComputeDate} filename="reg" text="Export Registrations" />
        </p>
      </div>
    </div>
  );
}
