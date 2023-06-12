"use client";

import { useEffect, useState } from "react";
import { ID, Models } from "appwrite";
import AppwriteConfig from "../../constants/appwrite_config";

import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

export default function Event({ params }: { params: { event: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [docs, setDocs] = useState<Models.Document[]>();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoader(true);
    const getDocs = appwriteConfig.databases
      .listDocuments(`${process.env.NEXT_PUBLIC_REGDB}`, params["event"])
      .then(
        function (response) {
          setDocs(response.documents);
        },
        function (error) {
          console.log(error);
        }
      );
    setLoader(false);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto">
      <p className="text-2xl font-bold mb-2 flex justify-center mx-auto py-10">
        Active Registrations
      </p>
      {loader ? (
        <p className="mx-auto text-red-700">Loadings....</p>
      ) : (
        <div>
          {docs &&
            docs.map((item) => (
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
            ))}
        </div>
      )}
      </div>
    </div>
  );
}
