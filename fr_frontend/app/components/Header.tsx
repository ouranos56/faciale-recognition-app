"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";
import useScrollDirection from "../hookq/useScrollDirection";

export default function Header() {
    const scrollDirection = useScrollDirection();
    const [scrolldown, setScrollDown] = useState<string>("");

    useEffect(() => {
        if (scrollDirection === "down") {
            setScrollDown("down")
        } else {
            setScrollDown("up")
        }
    }, [scrollDirection]);


    return (
        <div>


            < div
                className={`${scrolldown === "down" ? "header_down" : "header_up"} md_header z-9 navbar shadow-sm backdrop-blur-[6px] bg-base-200/80`}
            >
                <div className="navbar-start md_navbar justify-start gap-8 pl-6">
                    <Link href="/" className="a">Accueil</Link>
                    <Link href="../get-started" className="a">Commencer</Link>
                </div>

                <div className="navbar-center">
                    <a
                        className="btn btn-ghost text-xl"
                        onClick={() => { window.location.reload() }}
                    >EDIYA</a>
                </div>

                <div className="navbar-end"></div>
            </div >

            < div
                className={`z-10 md_header navbar shadow-sm backdrop-blur-[6px] bg-base-200/80`}
            >
                <div className="navbar-start md_navbar md:justify-start gap-8 pl-6">
                    <Link href="/" className="a">Accueil</Link>
                    <Link href="../get-started" className="a">Commencer</Link>
                </div>

                <div className="navbar-center">
                    <a
                        className="btn btn-ghost text-xl "
                        onClick={() => { window.location.reload() }}
                    >EDIYA</a>
                </div>

                <div className="navbar-end"></div>
            </div >
        </div>
    )
}