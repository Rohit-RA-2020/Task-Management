"use client";

import Image from "next/image";
import Icon from "../../public/logo/logo-transparent-svg.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {AppwriteConfig} from "../constants/appwrite_config";

export default function Header() {
  const appwriteConfig = new AppwriteConfig();
  const router = useRouter();
  return (
    <header className="text-gray-400 bg-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/landing">
          <Image src={Icon} height={200} width={200} alt="Product Logo" />
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            className="mr-5 hover:text-gray-900 text-gray-500 "
            href="/myevents"
          >
            My Events
          </Link>
          <Link
            className="mr-5 hover:text-gray-900 text-gray-500 "
            href="/events"
          >
            Find Events
          </Link>
          <Link className="mr-5 hover:text-gray-900 text-gray-500 " href="/create">
            Create Event
          </Link>
        </nav>
        <button
          className="inline-flex items-center bg-[#f02e65] border-0 py-1 px-3 focus:outline-none hover:bg-[#ab073d] rounded-full text-base mt-4 md:mt-0"
          onClick={() => {
            const sucess = appwriteConfig.signOut(
              JSON.parse(localStorage.getItem("userInfo") || "{}")["$id"]
            );
            if (sucess) {
              localStorage.removeItem("userInfo");
              router.push("/login");
            }
          }}
        >
          <p className="text-sm my-1 text-white">Sign Out</p>
        </button>
      </div>
    </header>
  );
}
