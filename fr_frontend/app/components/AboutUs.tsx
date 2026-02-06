"use client"

import "../globals.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function AboutUs() {

    const modalRef = useRef<HTMLDialogElement>(null);

    const [title_out, setTitle_out] = useState(false);
    const i_titleRef = useRef<HTMLDivElement>(null);

    const scaleUp = () => {
        i_titleRef.current?.classList.add("scale_up_title");
        setTimeout(() => {
            i_titleRef.current?.classList.remove("scale_up_title");
        }, 1000);
    }

    useEffect(() => {
        if (title_out) {
            i_titleRef.current?.classList.add("tooltip");
            setTimeout(() => {
                i_titleRef.current?.classList.remove("tooltip");
                setTitle_out(false);
            }, 2500);
        }
    }, [title_out]);

    const [mobile_width, setMobile_width] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth <= 485;
            setMobile_width(isMobile);
            console.log(isMobile)
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return (
        <div>
            <a className="link link-hover a" onClick={
                () => modalRef.current?.showModal()
            }
            > À propos
            </a >

            <dialog id="my_modal_2 "
                className="modal"
                ref={modalRef}
            >
                <div className="modal-box">
                    <div className=" mt-[-3%] flex flex-row justify-center items-center text-[#bb4d00] font-medium text-lg">
                        Hello!
                        <Image
                            src="/assets/wired-outline-2716-logo-clubhouse-hover-pinch.gif"
                            unoptimized
                            alt="Gif Hand do hello"
                            width={60}
                            height={60}
                            className={`pl-1 opacity-40 hover:opacity-50 transition-opacity duration-300`}
                        />
                    </div>
                    <div className="font-light py-4 uploadedimagecard h-[60vh] text-xl text-justify hyphens-auto">
                        <div className="text-center text-2xs pb-1">
                            <span className="text-[#bb4d00] font-medium ">Ediya</span> en <span className="text-[#bb4d00] font-medium ">Fon</span> (langue Béninoise) pour dire <span className="text-[#bd5104] text-2xl font-black ">&laquo;</span> <span className="text-[#bb4d00] font-medium ">Lui ressemble t-il?</span> <span className="text-[#bd5104] text-2xl font-black ">&raquo;</span>.
                        </div>
                        
                        <div className="my-3.25"></div>Ediya combine <span className="text-[#bd5104] font-[380] ">vision par ordinateur</span>, analyse de données massives et infrastructure cloud avancée pour offrir une expérience fluide, rapide, fiable et surtout cohérente pour la vérification d&apos;identité.

                        <div className="my-3.25"></div>Avec une <span className="text-[#bb4d00] font-normal ">interface soignée et un design minimaliste</span>, nous proposons une immersion totale dans un environnement numérique de nouvelle génération.

                        <div className="my-3.25"></div>Plus qu’un outil, ce projet est une <span className="text-[#bb4d00] font-normal ">technologie vivante, qui évolue et s’affine à chaque nouvelle version</span> grâce à une architecture moderne, garantissant ainsi précision, sécurité et rapidité; repoussant ainsi toujours plus loin les limites de l’innovation.

                        <div className="my-3.25"></div><span className="text-[#bb4d00] font-normal ">La technologie n’est utile que si elle crée un impact réel.</span>
                        &nbsp;Et pour cause, notre solution est conçue pour être <span className="text-[#bb4d00] font-normal ">accessible à un large public</span> visant à <span className="text-[#bd5104] font-medium ">&laquo;</span>lutter contre la fraude, l&apos;usurpation d&apos;identité <span className="text-[#bd5104] font-medium ">&raquo;</span>, etc. 
                        Chaque ligne de code, chaque modèle IA, chaque élément d’infrastructure repose sur une seule philosophie : <span className="text-[#bb4d00] font-normal ">la performance avant tout</span>. 
                        Nous y avons mis notre énergie, notre créativité et notre envie d’innover. 
                        <span className="text-[#bb4d00] font-normal ">Le résultat ?</span> <span className="font-normal">Une IA qui donne envie de tester, d’explorer, de comprendre.</span>

                        <div className="my-3.25"></div>Notre ambition est de <span className="text-[#bb4d00] font-normal ">créer un modèle capable de rivaliser avec les leaders mondiaux</span>, tout en portant une <span className="font-normal">signature africaine</span> forte : l’ingéniosité, l&apos;accessibilité, la résilience et la créativité.

                        <div className="my-3.25 font-normal">Rejoindre ce projet, c’est participer à l’écriture d’un nouveau chapitre de la tech africaine, plus créatif, plus audacieux et plus influent.</div>
                        
                    </div>
                    <div className="text-[#bb4d00] text-lg font-normal flex flex-row text-center justify-center items-center"><Mail size={30} strokeWidth={1} />&nbsp;frinnovagen56bj@gmail.com</div>
                    <div
                        title="ESC pour fermer la pop up!"
                        ref={i_titleRef}
                        onClick={() => { setTitle_out(true); scaleUp() }}
                        className=" mt-[-8%] badge badge-outline border-[#dd8800b3] text-[#dd8800b3] w-7 h-7 rounded-3xl cursor-help relative -bottom-7.5 right-[-50%] m-4"
                    >
                        i
                    </div>
                </div>


                <form method="dialog" className="modal-backdrop modalmd">
                    <button className="modalbtn  text-center justify-center items-center"
                    >
                        close
                    </button>
                </form>
            </dialog>

        </div>
    )
}