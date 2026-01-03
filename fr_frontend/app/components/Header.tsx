"use client";
// import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";
import useScrollDirection from "../hookq/useScrollDirection";
import { useEffect, useRef, useState } from "react";
import { Eraser } from "lucide-react";

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
    // const scrolldown = scrollDirection === "down" ? "down" : "up";
    const [erasepredictions, setErasepredictions] = useState<boolean>(false);

    useEffect(() => {
        if (erasepredictions) {
            localStorage.setItem("erasepredictions", erasepredictions.toString());
            localStorage.setItem('sid_erase', "false");
            window.location.reload();
        }
    }, [erasepredictions]);

    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <div>
            <dialog id="my_modal_2"
                className="modal"
                ref={modalRef}
            >
                <div className="modal-box flex flex-col justify-center items-center text-center text-orange-600 font-medium">
                    Etes vous sûr de vouloir effacer toutes vos prédictions ?
                    <div className="modal-action flex flex-row justify-center items-center gap-4">
                        <button className="btn btn-primary"
                            onClick={() => {
                                setErasepredictions(true);
                                modalRef.current?.close();
                            }}
                        >
                            Oui
                        </button>
                        <button className="btn btn-secondary"
                            onClick={() => {
                                setErasepredictions(false);
                                modalRef.current?.close();
                            }}
                        >
                            Non
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="text-center justify-center items-center"
                    >close
                    </button>
                </form>
            </dialog>

            < div
                className={`${scrolldown === "down" ? "header_down" : "header_up"} md_header z-9 navbar shadow-sm backdrop-blur-[6px] bg-base-200/80`}
            >
                <div className="navbar-start md_navbar justify-start gap-4 pl6">
                    <div className="flex flex-row justify-center gap-4">
                        <Link href="/" className="a">Accueil</Link>
                        <Link href="../get-started" className="a">Commencer</Link>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-1.5 border-b-2 rounded-b-box px-3 py-1">
                        <button
                            className="btn btn-sm p-2 bg-transparent hover:bg-red-200 hover:scale-105 transition-all"
                            onClick={() => modalRef.current?.showModal()}
                            title="Effacer toutes vos prédictions."
                        >
                            <Eraser size={17} color="#ff4242" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>

                <div className="navbar-center">
                    <a
                        className="btn btn-ghost text-xl"
                        onClick={() => { window.location.reload() }}
                    >EDIYA</a>
                </div>

                <div className="navbar-end justify-center items-center"></div>
            </div >


            < div
                className={`z-10 md_header navbar shadow-sm ${scrolldown === "down" ? "opacity-0" : "opacity-100"} backdrop-blur-[6px] bg-base-200/80`}
            >
                <div className="navbar-start md_navbar md:justify-start gap-4 pl6">
                    <div className="flex flex-row justify-center gap-4">
                        <Link href="/" className="a">Accueil</Link>
                        <Link href="../get-started" className="a">Commencer</Link>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-1.5 border-b-2 rounded-b-box px-3 py-1">
                        <button
                            className="btn btn-sm p-2 bg-transparent hover:bg-red-200 hover:scale-105 transition-all"
                            // onClick={() => setErasepredictions(true)}
                            onClick={() => modalRef.current?.showModal()}
                            title="Effacer toutes vos prédictions."
                        >
                            <Eraser size={17} color="#ff4242" strokeWidth={1.75} />
                        </button>
                    </div>
                </div>

                <div className="navbar-center">
                    <a
                        className="btn btn-ghost text-xl "
                        onClick={() => { window.location.reload() }}
                    >EDIYA</a>
                </div>

                <div className="navbar-end justify-center items-center"></div>
            </div >
        </div>
    )
}
