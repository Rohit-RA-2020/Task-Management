"use client";

import { useEffect, useState } from "react";
import { Models, Client} from "appwrite";
import {AppwriteConfig} from "../../constants/appwrite_config";

import CsvDownloader from "react-csv-downloader";

import Header from "@/app/components/header";


export default function Event({ params }: { params: { event: string } }) {
  const appwriteConfig = new AppwriteConfig();

  const [docs, setDocs] = useState<Models.Document[]>();

  const [event, setEvent] = useState<Models.Document>();

  const callAPI = async (email: string, subject: string,  message: string) => {
    try {
      fetch("https://send-grid-api.vercel.app/sendemail", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          subject: subject,
          message: message,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
    appwriteConfig.databases
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
    appwriteConfig.databases.getDocument(
      `${process.env.NEXT_PUBLIC_DATABASEID}`,
      `${process.env.NEXT_PUBLIC_EVENT_COLLID}`,
      params["event"]
    ).then(
      function (response) {
        setEvent(response);
      }
    );
    const unsubscribe = appwriteConfig.client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_REGDB}.collections.${params["event"]}.documents`,
      (response) => {
        appwriteConfig.databases
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
      }
    );
  }, []);

  const handleAcceptanceEmail = (id: string, name: string, email: string) => {
    appwriteConfig.databases
      .updateDocument(`${process.env.NEXT_PUBLIC_REGDB}`, params["event"], id, {
        confirm: "accept",
      })
      .then(() => {
        callAPI(
          email,
          `Knock Knock, Seems like your lucky day`,
          `Hey ${name}, You have been aceepted to attend the ${event && event.eventname}. We hope you have a great time. Contact the host at ${
            JSON.parse(localStorage.getItem("userInfo") || "{}").email
          } for any further queries`
        );
      });
  };

  const handleRejectionEmail = (id: string, name: string, email: string) => {
    appwriteConfig.databases.updateDocument(
      `${process.env.NEXT_PUBLIC_REGDB}`,
      params["event"],
      id,
      {
        confirm: "reject",
      }
    ).then(() => {
      callAPI(
        email,
        `We appreciate your interest in the event.`,
        `Hey ${name}, we regret to inform you that your invitation has been cancelled to attend ${event && event.eventname}. We hope you look for other events in future. Contact the host at ${
          JSON.parse(localStorage.getItem("userInfo") || "{}").email
        } for any further queries`
      );
    });
  };

  return (
    <div className="">
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Event Attendees</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Name
                </th>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Email
                </th>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {docs &&
                docs.map((attendee) => (
                  <tr key={attendee.id} className="bg-gray-100">
                    <td className="py-4 px-6">{attendee.name}</td>
                    <td className="py-3 px-6 ">{attendee.email}</td>
                    <td className="py-4">
                      {attendee.confirm == "accept" ? (
                        <button
                          className="bg-green-800 text-white px-4 py-2 rounded mr-2"
                          onClick={() => alert("Already sent Acceptance mail")}
                        >
                          Accepted
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                          onClick={() =>
                            handleAcceptanceEmail(attendee.$id, attendee.name, attendee.email)
                          }
                        >
                          Accept
                        </button>
                      )}
                      {attendee.confirm == "reject" ? (
                        <button
                          className="bg-red-800 text-white px-4 py-2 rounded"
                          onClick={() => alert("Already sent Rejection mail")}
                        >
                          Rejected
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          onClick={() => handleRejectionEmail(attendee.$id, attendee.name, attendee.email)}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <CsvDownloader
            datas={asyncFnComputeDate}
            filename="reg"
            text="Export Registrations"
          />
        </div>
      </div>
    </div>
  );
}
