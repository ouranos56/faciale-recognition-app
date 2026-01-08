"use client"

import React, { useState } from "react";
import Image from "next/image"
import PredEx from "./assets/PredEx.png"
import PredEx_1 from "./assets/PredEx_1.png"
import PredEx_2 from "./assets/PredEx_2.png"
import PredEx_3 from "./assets/PredEx_3.png"
import PredEx_4 from "./assets/PredEx_4.png"
import GetStartedImage from "./assets/get-started-1.png"
import { useEffect, useRef } from "react";
import Link from "next/link";
import LoopingVideo from "./components/LoopingVideo"
import vid1Gif from "./assets/vid1.gif";
import toast from "react-hot-toast";
import "./globals.css";

export default function Home() {

    const TadaBtnRef = useRef<HTMLAnchorElement>(null);
    const BottElemwref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = TadaBtnRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !element.classList.contains('animated')) {
                element.classList.add('tada');
                element.classList.add('animated');
                observer.disconnect();
            }
            setTimeout(() => {
                element.classList.remove("tada")
                element.classList.remove("animated")
            }, 5000);
        }, {
            threshold: 0.1
        });

        observer.observe(element);

        return
        // () => observer.disconnect();
    }, []);

    useEffect(() => {
        const element = BottElemwref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !element.classList.contains('animated')) {
                element.classList.add('slide_up');
                element.classList.add('animated');
                observer.disconnect();
            }
            setTimeout(() => {
                // element.classList.remove("slide_up")
                element.classList.remove("animated")
            }, 2000);
        }, {
            threshold: 0
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // const [send, setSend] = useState<{ success?: string; error?: string }>({});
    // useEffect(() => {
    //     if (send.success) {
    //         toast.success(send.success);
    //         setTimeout(() => setSend({}), 1000);
    //         return;
    //     }
    //     if (send.error) {
    //         toast.error(send.error);
    //         setTimeout(() => setSend({}), 1000);
    //     }
    // }, [send]);

    const ediyaRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div>
            {loading
                ? (
                    <div className="flex justify-center items-center">
                        {/* <div className="loader1 z-20"></div> */}
                        <div className="loader3 z-20"></div>
                    </div>
                )
                : <div className="hidden"></div>
            }
            <div className={`${loading ? "hidden" : "flex"} flex flex-col p-0.5 justify-center items-center w-[98vw] `}>


                {/* For TSX uncomment the commented types below */}
                <div className="gri grid-flow-col gap-5 text-center auto-cols-max hidden">
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            {/* <span style={{ "--value": 15 } as React.CSSProperties  aria-live="polite" aria-label={counter}>15</span> */}
                        </span>
                        days
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            {/* <span style={{ "--value": 10 } as React.CSSProperties  aria-live="polite" aria-label={counter}>10</span> */}
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            {/* <span style={{ "--value": 24 }  as React.CSSProperties /} aria-live="polite" aria-label={counter}>24</span> */}
                        </span>
                        min
                    </div>
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                            {/* <span style={{ "--value": 59 } / as React.CSSProperties /} aria-live="polite" aria-label={counter}>59</span> */}
                        </span>
                        sec
                    </div>
                </div>





                <div
                    ref={ediyaRef}
                    className="flex ediya1 text-7xl font-bold  justify-center-items-center text-center mb-10">
                    EDIYA
                </div>

                <div className="top-[100vh] card_up h-fit">
                    <div className=" justify-center items-center h-fit px-2">
                        {/* <LoopingVideo
                            src="\assets\vid1.mp4"
                            className="object-cover introduce_vid w-[100vw] md:w-[125vw]"
                        /> */}
                        <Image
                            src={vid1Gif}
                            unoptimized
                            alt="Gif showing face recognition of a man"
                            // width={250}
                            // height={250}
                            priority
                            className="introduce_gif w-[85vw] h-[120vh] "
                        />
                    </div>

                </div>


                <div className="card lg:w-[80%] backdrop-blur-[3px] w-[95%] border-2 border-[#3f280f21] shadow-2xl bg-transparent justify-center items-center my-32 relative">
                    <Link
                        href="./get-started"
                        ref={TadaBtnRef}
                        className="btn btn-accent rounded-field text-xl absolute md_btn_essayer hover:bg-[#3f280f] hover:text-[#f3ede9]     "
                    >Essayer
                    </Link>
                    <div className=" text-justify p-5 md_essayer_text">
                        Bienvenue dans une nouvelle ère où la technologie cesse d&apos;être un simple outil pour devenir un véritable moteur d&apos;innovation.<br />
                        <br />Notre plateforme repose sur un algorithme d&apos;intelligence artificielle pour la reconnaissance faciale, capable d&apos;analyser et de comparer les profils avec grande précision et finesse. 
                        Conçue pour être accessible à tous, elle ne nécessite aucune expertise : l&apos;interface est intuitive, rapide et pensée pour un usage simple.<br />

                        <br />Ce n&apos;est pas de la science-fiction. C&apos;est maintenant. Essayez-la en un clic!
                    </div>
                </div>

                <div className="flex md_comparer mb-3.5 H1 w-[96vw] items-center justify-center " aria-label="Comparer de visages,">
                    <div className="text-center md:w-fit ">Comparer des visages,&nbsp;</div>
                    <div className="typewriter text-wrap"></div>
                </div>

                <div className="predex shadow-2xl rounded-2xl mb-32 h-fit">
                    <Image
                        src={PredEx}
                        unoptimized
                        alt="Aperçu de l'image"
                        // width={1000}
                        // height={1250}
                        // priority
                        loading="lazy"
                        className="md:w-[70vw] md:h-[90vh] md_predex"
                    />

                    <div className="relative rounded-2xl">
                        <div className="PredExs_overlay1 opacity-10"></div>
                        <div className="carousel rounded-2xl md_predex1">
                            <div className="carousel-item">
                                <Image
                                    src={PredEx_1}
                                    unoptimized
                                    alt="Aperçu de l'image"
                                    // priority
                                    loading="lazy"
                                    className="md_predex1 md:hidden lg:hidden"
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={PredEx_2}
                                    unoptimized
                                    alt="Aperçu de l'image"
                                    // priority
                                    loading="lazy"
                                    className="md_predex1 md:hidden lg:hidden"
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={PredEx_3}
                                    unoptimized
                                    alt="Aperçu de l'image"
                                    // priority
                                    loading="lazy"
                                    className="md_predex1 md:hidden lg:hidden"
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    src={PredEx_4}
                                    unoptimized
                                    alt="Aperçu de l'image"
                                    // priority
                                    loading="lazy"
                                    className="md_predex1 md:hidden lg:hidden"
                                />
                            </div>
                            
                        </div>
                        <div className="PredExs_overlay opacity-10"></div>
                    </div>



                </div>


                <div
                    ref={BottElemwref}
                    className="flex md:flex-row opacity-0 md:gap-16 md_commencer_container justify-center items-center md:w-[85vw] md:h-[70vh] mt-20 "
                >
                    <div className="tour-card md:w-[65%] md:h-[66vh]">

                        <div className="tour-header">
                            <div className="text-center relative top-[-50%] ">
                                <Link className="btn more-link md_commencer_btn" href="./get-started">
                                    Commencer
                                </Link>
                            </div>

                        </div>

                        <div className="tour-image-container">
                            <div className="justify-around">
                                <Image
                                    src={GetStartedImage}
                                    loading="lazy"
                                    unoptimized
                                    alt="Face vérification landscape"
                                    className="tour-image "
                                />

                                <div className="image-overlay">
                                </div>
                            </div>


                        </div>

                        <div className="tour-tag">
                            <div className="hiking-tag ">
                                #Face Recognition
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl md_commencer_text md:w-[40%] h[65vh] p-3 text-[#3f280f] text-justify md:text-xl uploadedimagecard">
                        Ici, l&apos;IA n&apos;est pas un concept abstrait, mais une expérience concrète et captivante.<br />

                        <br />Notre solution privilégie l&apos;efficacité et la clarté; elle n&apos;essaie pas d&apos;être parfaite : elle a été conçue pour être utile, intuitive et stimulante.
                         Fruit d&apos;un travail rigoureux et d&apos;une démarche créative, elle incarne notre engagement envers des technologies porteuses de valeur.<br />

                        <br />Essayez-la dès maintenant, l’avenir commence peut-être ici.
                    </div>
                </div>


            </div>
        </div>

    )
}
