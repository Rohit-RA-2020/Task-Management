"use client";

import { useRouter } from "next/navigation";
import CreateEventPage from "./create";
import { useEffect } from "react";

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userInfo") === null) {
      router.push("/login");
    }
  });

  return <CreateEventPage />;
}
