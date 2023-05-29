'use client';
import Body from "./body"
import Image from 'next/image';
import Icon from "../../public/logo/logo-transparent-svg.svg";
import { GoBroadcast } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Landing() {
    const router = useRouter();
    return (
        <div>
            <header className="text-gray-400 bg-white body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Image
                        src={Icon}
                        height={200}
                        width={200}
                        alt="Product Logo"
                    />
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link className="mr-5 hover:text-gray-900 text-gray-500 " href="/landing">First Link</Link>
                        <Link className="mr-5 hover:text-gray-900 text-gray-500 " href="/landing">Second Link</Link>
                        <Link className="mr-5 hover:text-gray-900 text-gray-500 " href="/">Third Link</Link>
                        <Link className="mr-5 hover:text-gray-900 text-gray-500 " href="/">Fourth Link</Link>
                    </nav>
                    <button className="inline-flex items-center bg-[#DB195A] border-0 py-1 px-3 focus:outline-none hover:bg-[#ab073d] rounded-full text-base mt-4 md:mt-0" onClick={() => router.push('/create')}>
                        <div className="flex align-items-center gap-1 justify-center mx-auto">
                            <GoBroadcast className='text-xl my-auto text-white' />
                            <p className='text-sm my-1 text-white'>Create Event</p>
                        </div>
                    </button>

                </div>

            </header>
            <Body />
        </div>
    )
}