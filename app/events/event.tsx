"use client";

import { useEffect, useState } from "react"
import AppwriteConfig from "../constants/appwrite_config";
import Header from "../components/header";

export default function EventListing() {

    const appwriteConfig = new AppwriteConfig();


    const [allEvents, setAllEvents] = useState(Object);

    useEffect(() => {
        // appwriteConfig.client.subscribe(`databases.${process.env.NEXT_PUBLIC_DATABASEID}.collections.${process.env.NEXT_PUBLIC_EVENT_COLLID}`, response => {
        //     setAllEvents(response.payload);
            
        // });
        appwriteConfig.databases.listDocuments(process.env.NEXT_PUBLIC_DATABASEID || '', process.env.NEXT_PUBLIC_EVENT_COLLID || '').then((res) => {
            console.table(res.documents[0]['EventName'])
        })
    })
    return (

        <div>
            <Header />
            <h1>Welcome to all events Page</h1>
            <div className="flex flex-wrap m-4">
                {allEvents[0]} 
            </div>
        </div>
    )
}