"use client"

import "../globals.css";
import { useEffect, useRef, useState } from "react";

export default function PriacySecure() {

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
    return (
        <div>
            <a className="link link-hover a" onClick={
                () => modalRef.current?.showModal()
            }
            > Politique de Sécurité et d’Utilisation des Données

            </a >

            <dialog id="my_modal_2 "
                className="modal"
                ref={modalRef}
            >
                <div className="modal-box">
                    <div className="py-4 uploadedimagecard h-[60vh] text-xl text-justify">
                        {/* <div className="text-center text-2xs"><strong className="text-[#bb4d00] font-[500] ">Ediya</strong> en <strong className="text-[#bb4d00] font-[500] ">Fon</strong> (langue Béninoise) pour dire <strong className="text-[#bd5104] text-2xl font-[900] ">&laquo;</strong> <strong className="text-[#bb4d00] font-[500] ">Lui ressemble t-il</strong> <strong className="text-[#bd5104] text-2xl font-[900] ">&raquo;</strong>.</div> */}
                        {/* <br />Ediya combine <strong className="text-[#bd5104] font-[380] ">vision par ordinateur</strong>, analyse de données massives et infrastructure cloud avancée pour offrir une expérience fluide, rapide, fiable et surtout cohérente pour la vérification d&apos;identité. */}
                        La sécurité des données n’est pas une option : c’est un engagement.
                        Nous appliquons des protocoles stricts pour préserver la confidentialité, l’intégrité et la transparence autour de votre identité numérique.

                        -Protection des données

                        Toutes les données biométriques sont chiffrées lors du transfert.

                        Aucune image n’est réutilisée, revendue ou exploitée en dehors du cadre prévu.

                        Les informations ne sont conservées que pour la durée nécessaire au traitement.

                        -Utilisation responsable

                        Nous ne procédons à aucune analyse sans consentement explicite de l’utilisateur.
                        Les modèles d’IA n’accèdent jamais aux données personnelles à des fins marketing ou commerciales.
                        Chaque traitement est limité à ce qui est strictement nécessaire pour la vérification .

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


                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}