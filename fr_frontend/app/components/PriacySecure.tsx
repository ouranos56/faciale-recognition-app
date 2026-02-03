"use client";

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
  };

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
      <a
        className="link link-hover hover:text-[#bb4d00] underline underline-offset-4 "
        onClick={() => modalRef.current?.showModal()}
      >
        {" "}
        Politique de Sécurité et d’Utilisation des Données
      </a>

      <dialog id="my_modal_2 " className="modal" ref={modalRef}>
        <div className="modal-box">
          <ul className="py-4 pr-2 overflow-auto h-[60vh] text-xl text-justify hyphens-auto">
                <div className="font-light">
                    La protection de vos données est une priorité absolue.
                    Nous nous engageons à assurer la confidentialité, l’intégrité et la transparence dans le traitement de votre identité numérique, conformément aux bonnes pratiques en matière de sécurité et de protection des données.
                </div>

                <li>
                    <div className="flex-col mt-6 font-light">
                        <div className="flex flex-row items-center gap-1.5 pl-2.25 ">
                        <div className="w-2.5 h-2.5 rounded-4xl bg-primary"></div>
                        <div>Protection des données</div>
                        </div>

                        <div className="pl-3 pt-1 ml-3 mb-6 border-l-2 border-l-neutral-content ">
                            Aucune donnée biométrique n’est conservée ni exploitée à des fins d’identification personnelle.
                            <div className="my-2"></div>Les traitements effectués servent uniquement à produire des résultats techniques temporaires nécessaires au fonctionnement du service.

                            <div className="my-2"></div>Les images fournies ne sont ni revendues, ni partagées, ni utilisées à des fins publicitaires ou commerciales.

                            <div className="my-2"></div>L’utilisation des images est strictement limitée à l’entraînement et à l’amélioration de nos modèles d’intelligence artificielle, dans un cadre contrôlé et sécurisé, sans association directe à l’identité civile de l’utilisateur.
                        </div>
                    </div>
                </li>

                <li>
                    <div className="flex flex-col font-light">
                        <div className="flex flex-row items-center gap-1.5 pl-2.25">
                        <div className="w-2.5 h-2.5 rounded-4xl bg-primary"></div>
                        <div>Utilisation responsable</div>
                        </div>

                        <div className="pl-3 ml-3 mb-6 border-l-2 border-l-neutral-content ">
                            <div className="my-2"></div>Aucun traitement n’est effectué sans l'intervention explicite de l’utilisateur.

                            <div className="my-2"></div>Les données ne sont jamais utilisées à des fins de marketing, de profilage commercial ou de ciblage publicitaire.

                            <div className="my-2"></div>Chaque opération de traitement est strictement limitée à ce qui est nécessaire pour fournir le service demandé (ex. : vérification ou prédiction).
                        </div>
                    </div>
                </li>

                <div className="">
                    En somme vos données vous appartiennent. 
                    Nous les traitons uniquement avec votre accord, pour un objectif précis, et dans un environnement sécurisé, sans exploitation abusive ni détournement.
                </div>
          </ul>

          <div
            title="ESC pour fermer la pop up!"
            ref={i_titleRef}
            onClick={() => {
              setTitle_out(true);
              scaleUp();
            }}
            className="badge badge-outline border-[#dd8800b3] text-[#dd8800b3] w-7 h-7 rounded-3xl cursor-help relative -bottom-7.5 right-[-50%] m-4"
          >
            i
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
