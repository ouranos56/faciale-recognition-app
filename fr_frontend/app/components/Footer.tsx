"use client"
import React, { SetStateAction, useEffect, useState } from "react";
import AboutUs from "../AboutUs";
import ContactUs from "../ContactUs";
import PriacySecure from "./PriacySecure";
import toast from "react-hot-toast";

export default function Footer() {
    // function setSend(value: SetStateAction<{ success?: string | undefined; error?: string | undefined; }>): void {
    //     throw new Error("Function not implemented.");
    // }

    const [send, setSend] = useState<{ success?: string; error?: string }>({});
      useEffect(() => {
        if (send.success) {
          toast.success(send.success);
          setTimeout(() => setSend({}), 1000);
          return;
        }
        if (send.error) {
          toast.error(send.error);
          setTimeout(() => setSend({}), 1000);
        }
      }, [send]);

    return (
        <footer className="flex flex-col footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-10 justify-between">
                  <AboutUs />
        
                  <ContactUs
                    setSend={setSend}
                  />
                  {/* <PriacySecure /> */}
                </nav>
        
                <aside>
                  <p>Copyright © {new Date().getFullYear()} EDIYA</p>
                </aside>
              </footer>
    )
}