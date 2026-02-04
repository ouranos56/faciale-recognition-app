"use client";

import React, { useState } from "react";
import Image from "next/image";
import PredEx from "./assets/PredEx.png";
import PredEx_1 from "./assets/PredEx_1.png";
import PredEx_2 from "./assets/PredEx_2.png";
import PredEx_3 from "./assets/PredEx_3.png";
import PredEx_4 from "./assets/PredEx_4.png";
import portraitgif from "./assets/wired-outline-3099-portrait-photo-hover-pinch.gif";
import choosegif from "./assets/wired-outline-1315-computer-mouse-hover-pinch.gif";
import sendgif from "./assets/doodle-outline-692-document-upload-hover-pinch.gif";
import thumgif from "./assets/wired-outline-1122-thumb-down-morph-up.gif";
import GetStartedImage from "./assets/get-started-1.png";
import { useEffect, useRef } from "react";
import Link from "next/link";
import LoopingVideo from "./components/LoopingVideo";
import vid1Gif from "./assets/vid1.gif";
import "./globals.css";
import { Sparkles } from "lucide-react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const TadaBtnRef = useRef<HTMLAnchorElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const BottElemwref = useRef<HTMLDivElement>(null);
  const howworkref = useRef<HTMLDivElement>(null);
  const gridcardref1 = useRef<HTMLDivElement>(null);
  const gridcardref2 = useRef<HTMLDivElement>(null);
  const gridcardref3 = useRef<HTMLDivElement>(null);
  const gridcardref4 = useRef<HTMLDivElement>(null);
  const ediyaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = TadaBtnRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          element.classList.add("tada");
          element.classList.add("animated");
          observer.disconnect();
        }
        setTimeout(() => {
          element.classList.remove("tada");
          element.classList.remove("animated");
        }, 5000);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return;
  }, []);

  useEffect(() => {
    const element = fadeRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          element.classList.add("fade_in");
          element.classList.add("animated");
          observer.disconnect();
        }
        setTimeout(() => {
          element.classList.remove("animated");
        }, 5000);
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return;
  }, []);

  useEffect(() => {
    const element = BottElemwref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          element.classList.add("slide_up");
          element.classList.add("animated");
          observer.disconnect();
        }
        setTimeout(() => {
          element.classList.remove("animated");
        }, 2000);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = howworkref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          element.classList.add("slide_right");
          element.classList.add("animated");
          observer.disconnect();
        }
        setTimeout(() => {
          element.classList.remove("animated");
        }, 2000);
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const [opt, Setopt] = useState<number>(0);
  useEffect(() => {
    const element = ediyaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          element.classList.add("slide_right");
          element.classList.add("animated");
          observer.disconnect();

          setTimeout(() => {
            Setopt(100);
            element.classList.remove("animated");
            element.classList.remove("slide_right");
          }, 1100);
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function useSlideInOnView(
    ref: React.RefObject<HTMLDivElement | null>,
    thr: number,
  ) {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !element.classList.contains("animated")) {
          setTimeout(() => {
            element.classList.add("slide_in");
          }, thr);
          element.classList.add("animated");
          observer.disconnect();
        }
        setTimeout(() => {
          element.classList.remove("animated");
        }, 2000);
      },
      {
        threshold: 0.4, // c'est à dire à 40% de l'élément visible
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }

  useEffect(() => {
    let thr = 0.0;
    for (const ref of [
      gridcardref1,
      gridcardref2,
      gridcardref3,
      gridcardref4,
    ]) {
      useSlideInOnView(ref, thr);
      thr += 250;
    }
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader3 z-20"></div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
      <div
        className={`${loading ? "hidden" : "flex"} flex flex-col p-0.5 justify-center items-center w-[98vw] `}
      >
        <div className="flex flex-col w-[87vw] justify-center items-center text-center mt-10 mb-5">
          {/* phrase introductie accrochante */}
          <div className="introtext text-[2rem] md:text-6xl uppercase font-bold text-center mb-2">
            {/* Quand l’identité exige de la certitude. <br /> */}
            {/* Simple.
            Sûre.
            Essentielle. */}
            Une technologie qui reconnaît, sans exposer
            <br />
          </div>
          <div className="flex justify-center items-center text-xl mt-6 mb-16 text-center italic">
            Bienvenue chez EDIYA
            <Sparkles
              color="#ce5e20"
              strokeWidth={1.5}
              className="w-5 relative -top-1"
            />
          </div>
        </div>

        <div className="top-[100vh] card_up h-fit mb-10 md:mb-22">
          <div className=" justify-center items-center h-fit px-2">
            {/* <LoopingVideo
              src="/assets/vid1.mp4"
              className="object-cover introduce_vid w-screen h-[60vh] md:w-[125vw] md:h-[140vh] "
            /> */}
            <Image
              src={vid1Gif}
              alt="Aperçu de l'image"
              unoptimized
              priority
              loading="eager"
              className="introduce_gif md:w-[125vw] md:h-[140vh]  object-cover"
            />
          </div>
        </div>

        <div className="card lg:w-[80%] backdrop-blur-[3px] w-[95%] border-2 border-[#3f280f21] shadow-2xl bg-transparent justify-center items-center my-32 relative">
          <Link
            href="./get-started"
            ref={TadaBtnRef}
            className="btn btn-accent rounded-field text-xl absolute md_btn_essayer hover:bg-[#3f280f] hover:text-[#f3ede9]     "
          >
            Essayer
          </Link>
          <div className=" text-justify hyphens-auto p-5 md_essayer_text">
            Bienvenue dans une nouvelle ère où la technologie cesse d&apos;être
            un simple outil pour devenir un véritable moteur d&apos;innovation.
            <div className="my-3.25"></div>
            Notre plateforme repose sur un algorithme d&apos;intelligence
            artificielle pour la reconnaissance faciale, capable d&apos;analyser
            et de comparer les profils avec grande précision et finesse. Conçue
            pour être accessible à tous, elle ne nécessite aucune expertise :
            l&apos;interface est intuitive, rapide et pensée pour un usage
            simple.
            <div className="my-3.25"></div>
            Ce n&apos;est pas de la science-fiction. C&apos;est maintenant.
            Essayez-la en un clic!
          </div>
        </div>

        <div
          className="flex md_comparer mt-22 mb-7 H1 w-[96vw] items-center justify-center gap-1 "
          aria-label="Comparer de visages,"
        >
          <div className="text-center md_comparer_c text-5xl w-full md:w-fit ">
            Comparer des visages,&nbsp;
          </div>
          <div className="typewriter md_comparer_c text-center text-5xl text-wrap w-full md:w-fit "></div>
        </div>

        <div
          ref={fadeRef}
          className="opacity-0 predex shadow-2xl rounded-2xl md:rounded-4xl mb-32 h-fit"
        >
          <Image
            src={PredEx}
            unoptimized
            alt="Aperçu de l'image"
            loading="lazy"
            className="md:w-[70vw] md:h-[90vh] md_predex rounded-4xl"
          />

          <div className="relative rounded-2xl">
            <div className="PredExs_overlay1 opacity-10"></div>
            <div className="carousel rounded-2xl md_predex1">
              <div className="carousel-item">
                <Image
                  src={PredEx_1}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className="md_predex1 md:hidden lg:hidden"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src={PredEx_2}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className="md_predex1 md:hidden lg:hidden"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src={PredEx_3}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className="md_predex1 md:hidden lg:hidden"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src={PredEx_4}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className="md_predex1 md:hidden lg:hidden"
                />
              </div>
            </div>
            <div className="PredExs_overlay opacity-10"></div>
          </div>
        </div>

        <div className="flex flex-col h-fit w-[85vw] justify-between items-center m-22 ">
          <div
            ref={howworkref}
            className="opacity-0 text-5xl text-center font-bold"
          >
            Comment ça marche ?
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 ">
            <div
              ref={gridcardref1}
              className="relative opacity-0 hover:scale-103 card card-md bg-base-200 p-4 shadow-xl border-[0.5px] border-amber-900 flex flex-col h-fit justify-center items-center "
            >
              <div className=" w-20 h-20">
                <Image
                  src={portraitgif}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className=""
                />
              </div>

              <div className="text-xl text-center mt-2.5 ">
                Assurez-vous, d'avoir des images contenant une personne par
                image; et plus les visages sont visibles mieux c'est.
              </div>

              <div className="flex relative -right-[48%] top-3 items-center justify-center text-xl font-medium text-center text-amber-700  w-9 h-9 rounded-4xl bg-base-300 ">
                1
              </div>
            </div>

            <div
              ref={gridcardref2}
              className="relative opacity-0 hover:scale-103 card card-md bg-base-200 p-4 shadow-xl border-[0.5px] border-amber-900 flex flex-col h-fit justify-center items-center "
            >
              <div className=" w-20 h-20">
                <Image
                  src={sendgif}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className=""
                />
              </div>

              <div className="text-xl text-center mt-2.5 ">
                Importer les images que vous souhaitez comparer, et autant que
                vous le désirez.
                <br />
                <br />
              </div>

              <div className="flex relative -right-[48%] top-2.5 items-center justify-center text-xl font-medium text-center text-amber-700  w-9 h-9 rounded-4xl bg-base-300 ">
                2
              </div>
            </div>

            <div
              ref={gridcardref3}
              className="relative opacity-0 hover:scale-103 card card-md bg-base-200 p-4 shadow-xl border-[0.5px] border-amber-900 flex flex-col h-fit justify-center items-center "
            >
              <div className=" w-20 h-20">
                <Image
                  src={choosegif}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className=""
                />
              </div>

              <div className="text-xl text-center mt-2.5 ">
                Sélectionner les images que vous souhaitez comparer, et un model
                (optionnel). Et comparer simplement.
              </div>

              <div className="flex relative -right-[48%] top-3 items-center justify-center text-xl font-medium text-center text-amber-700  w-9 h-9 rounded-4xl bg-base-300 ">
                3
              </div>
            </div>

            <div
              ref={gridcardref4}
              className="relative opacity-0 hover:scale-103 md:col-start-2 card card-md bg-base-200 p-4 shadow-xl border-[0.5px] border-amber-900 flex flex-col h-fit justify-center items-center "
            >
              <div className=" w-20 h-18">
                <Image
                  src={thumgif}
                  unoptimized
                  alt="Aperçu de l'image"
                  loading="lazy"
                  className="h-18"
                />
              </div>

              <div className="text-xl text-center mt-2.5 ">
                Si le coeur vous en dit, en cas de mauvais résultat, n'hésitez
                pas à nous le faire savoir pour que nous puissions améliorer
                notre solution.
              </div>

              <div className="flex relative -right-[48%] top-3 items-center justify-center text-xl font-medium text-center text-amber-700 w-9 h-9 rounded-4xl bg-base-300 ">
                4
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ediyaRef}
          className={`flex ediya1 text-7xl font-bold justify-center items-center text-center mt-32 opacity-${opt}`}
        >
          EDIYA
        </div>

        <div
          ref={BottElemwref}
          className="flex md:flex-row mt-12 m-8 opacity-0 md:gap-16 md_commencer_container justify-center items-center md:w-[88vw] md:h-[70vh] "
        >
          <div className="tour-card md:w-[65%] md:h-[66vh]">
            <div className="tour-header">
              <div className="text-center relative top-[-50%] ">
                <Link
                  className="btn more-link md_commencer_btn"
                  href="./get-started"
                >
                  Commencer
                </Link>
              </div>
            </div>

            <div className=" h-full w-full tour-image-container">
              <div className=" h-full w-full justify-between items-center flex flex-col">
                <Image
                  src={GetStartedImage}
                  loading="lazy"
                  unoptimized
                  alt="Face vérification landscape"
                  className=" h-full w-full tour-image"
                />

                <div className="image-overlay"></div>
              </div>
            </div>

            <div className="tour-tag">
              <div className="hiking-tag ">#Face Recognition</div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl md_commencer_text overflow-auto md:overflow-scroll md:w-[40%] p-3 text-[#3f280f] text-justify hyphens-auto md:text-xl uploadedimagecard">
            Pour nous, l&apos;IA n&apos;est pas un concept abstrait, mais une
            expérience concrète et captivante.
            <div className="my-2.25"></div>
            Notre solution privilégie l&apos;efficacité et la clarté; elle
            n&apos;essaie pas d&apos;être parfaite : elle a été conçue pour être
            utile, intuitive et stimulante. Fruit d&apos;un travail rigoureux et
            d&apos;une démarche créative, elle incarne notre engagement envers
            des technologies porteuses de valeur.
            <div className="my-2.25"></div>
            Essayez-la dès maintenant, l’avenir commence peut-être ici.
          </div>
        </div>
      </div>
    </div>
  );
}
