"use client";

import { useLottie } from "lottie-react";
import error from "../../../public/anim/error.json";
import { useRouter } from "next/navigation";

const style = {
    height: 300,
  };

export default function Failure() {
    const router = useRouter();
    setTimeout(() => {
        router.push('/login')
    }, 3000);
    const options = {
        animationData: error,
        loop: true,
        autoplay: true,
      };
    
      const { View } = useLottie(options, style);
    
      return (
        <div className="h-screen flex items-center justify-center">
            {View}

        </div>
      );
}
