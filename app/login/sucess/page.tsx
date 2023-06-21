"use client";

import { useLottie } from "lottie-react";
import sucess from "../../../public/anim/sucess.json";
import { useRouter } from "next/navigation";
import {AppwriteConfig} from "@/app/constants/appwrite_config";
import { useEffect } from "react";

const style = {
  height: 300,
};

export default function Sucess() {
  const appwriteconfig = new AppwriteConfig();

  useEffect(() => {
    appwriteconfig.getCurUser();
    setTimeout(() => {
      router.push("/landing");
    }, 2800);
  });

  const router = useRouter();

  const options = {
    animationData: sucess,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div className="h-screen flex items-center justify-center">{View}</div>
  );
}
