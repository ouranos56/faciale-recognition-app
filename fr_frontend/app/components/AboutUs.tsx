"use client"

import "../globals.css";
import { useEffect, useRef, useState } from "react";
import HellohHand from "../assets/wired-outline-2716-logo-clubhouse-hover-pinch.gif";
import Image from "next/image";
import { X } from "lucide-react";

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
                    <div className="flex flex-row justify-center items-center text-[#bb4d00] font-bold text-lg">
                        Hello!
                        <Image
                            src={HellohHand}
                            unoptimized
                            alt="Gif Hand do hello"
                            width={60}
                            height={60}
                            priority
                            className={`pl-1 opacity-40 hover:opacity-50 transition-opacity duration-300`}
                        />
                    </div>
                    <div className="py-4 uploadedimagecard h-[60vh] text-xl text-justify">
                        <div className="text-center text-2xs"><strong className="text-[#bb4d00] font-[500] ">Ediya</strong> en <strong className="text-[#bb4d00] font-[500] ">Fon</strong> (langue Béninoise) pour dire <strong className="text-[#bd5104] text-2xl font-[900] ">&laquo;</strong> <strong className="text-[#bb4d00] font-[500] ">Lui ressemble t-il</strong> <strong className="text-[#bd5104] text-2xl font-[900] ">&raquo;</strong>.</div>
                        <br />Ediya combine <strong className="text-[#bd5104] font-[380] ">vision par ordinateur</strong>, analyse de données massives et infrastructure cloud avancée pour offrir une expérience fluide, rapide, fiable et surtout cohérente pour la vérification d&apos;identité.

                        <br /><br />Avec une <strong className="text-[#bb4d00] font-[500] ">interface soignée et un design minimaliste</strong>, nous proposons une immersion totale dans un environnement numérique de nouvelle génération.

                        <br /><br />Plus qu’un outil, ce projet est une <strong className="text-[#bb4d00] font-[500] ">technologie vivante, qui évolue et s’affine à chaque nouvelle version</strong> grâce à une architecture moderne, garantissant ainsi précision, sécurité et rapidité; repoussant ainsi toujours plus loin les limites de l’innovation.

                        <br /><br /><strong className="text-[#bb4d00] font-[500] ">La technologie n’est utile que si elle crée un impact réel.</strong>
                        &nbsp;Et pour cause, notre solution est conçue pour être <strong className="text-[#bb4d00] font-[500] ">accessible à un large public</strong> visant à <strong className="text-[#bd5104] font-[800] ">&laquo;</strong>lutter contre la fraude, l&apos;usurpation d&apos;identité <strong className="text-[#bd5104] font-[800] ">&raquo;</strong>, etc. Chaque ligne de code, chaque modèle IA, chaque élément d’infrastructure repose sur une seule philosophie : <strong className="text-[#bb4d00] font-[500] ">la performance avant tout</strong>. Nous y avons mis notre énergie, notre créativité et notre envie d’innover. <strong className="text-[#bb4d00] font-[500] ">Le résultat ?</strong> <strong className="text-[#bd5104] font-[380] ">Une IA qui donne envie de tester, d’explorer, de comprendre.</strong>

                        <br /><br />Notre ambition est de <strong className="text-[#bb4d00] font-[500] ">créer un modèle capable de rivaliser avec les leaders mondiaux</strong>, tout en portant une signature africaine forte : l’ingéniosité, l&apos;accessibilité, la résilience et la créativité.

                        <br /><br />Rejoindre ce projet, c’est participer à l’écriture d’un nouveau chapitre de la tech africaine, plus créatif, plus audacieux et plus influent.

                        <div className="flex ">
                            <span
                                className="tracking-wider text-right w-full text-[#bd5104ba] font-[300] "
                                style={
                                    {
                                        fontFamily: `'Ms Madi', cursive`,
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        fontSize: "26px"
                                    }}
                            >by Ouranos W .</span>
                        </div>
                    </div>

                    <div
                        title="ESC pour fermer la pop up!"
                        ref={i_titleRef}
                        onClick={() => { setTitle_out(true); scaleUp() }}
                        className="badge badge-outline border-[#dd8800b3] text-[#dd8800b3] w-7 h-7 rounded-3xl cursor-help relative bottom-[-30px] right-[-50%] m-4"
                    >
                        i
                    </div>
                </div>


                <form method="dialog" className="modal-backdrop modal_md">
                    <button className="modal_btn  text-center justify-center items-center"
                    >
                        close
                        <X className={`${mobile_width} ? "flex" : "hidden" relative bottom-[75%] left-[1.5px] text-2xl text-red-400`} />
                    </button>
                </form>
            </dialog>

        </div>
    )
}