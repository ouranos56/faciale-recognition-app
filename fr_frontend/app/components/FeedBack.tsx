"use client"

import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import fr_api from "../fr_api";

type FeedBacKProps = {
  showFeedBack: boolean;
};

export default function FeedBacK({ showFeedBack }: FeedBacKProps) {
  const my_modalRef = useRef<HTMLDialogElement>(null)
  const [feedback, setFeedback] = useState<number>(0.5);

  useEffect(() => {
    // This will run when showFeedBack changes
    if (showFeedBack) {
      if (showFeedBack) {
        my_modalRef.current?.showModal();
      } else {
        my_modalRef.current?.close();
      }
    }
  }, [showFeedBack]);

  const handSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sid = localStorage.getItem('client_session_id');

    try {
      // Créer une promesse qui combine la requête API et le délai
      const reqpromise = fr_api.patch(
        `predictions/${sid}/`,
        {
          feedback: feedback
        }
      ).then(async response => {

        // Ajouter un délai de 1 secondes après la réponse
        await new Promise(resolve => setTimeout(resolve, 1000));
        return response; // Retourner la réponse pour la chaîne de promesses
      });

      // Utiliser toast.promise avec la promesse modifiée
      toast.promise(
        reqpromise,
        {
          loading: 'Envoi de la note...',
          success: `Note envoyée avec succès ! \nMerci pour votre contribution !`,
          error: 'Erreur lors de l\'envoi de la note !',
        },
        {
          duration: 2500, // Durée d'affichage des toasts success/error
        }
      )

    } catch (error) {
      console.error("Erreur lors de l'envoi de la Note:", error);
    }

    // Réinitialiser les champs
    setFeedback(0.5);

    my_modalRef.current?.close();
  };

  return (
    <div>
      {/* < button
        className="btn"
        onClick={() => my_modalRef.current?.showModal()}
      > open modal</button > */}

      <dialog ref={my_modalRef} id="my_modal_3" className="modal">
        <div className="modal-box text-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle absolute right-2 top-2 text-red-500 font-bold text-xl rounded-full w-6 h-6 border-2 border-red-500 hover:bg-red-200 ">✕</button>
          </form>

          <form
            method="get"
            action=""
            onSubmit={(e) => handSubmit(e)}
          >
            <h3 className="font-bold text-lg">Votre avis compte 🙏</h3>

            <p className="py-4">
              Quelle note donnez-vous à EDIYA?
            </p>

            <div className="flex flex-col justify-center items-center">
              <div className="rating rating-lg rating-half">
                <input type="radio" name="rating-11" className="rating-hidden" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="0.5 star" value={0.5} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="1 star" value={1} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="1.5 star" defaultChecked value={1.5} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="2 star" value={2} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="2.5 star" value={2.5} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="3 star" value={3} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="3.5 star" value={3.5} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="4 star" value={4} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="4.5 star" value={4.5} onChange={(e) => setFeedback(Number(e.target.value))} />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="5 star" value={5} onChange={(e) => setFeedback(Number(e.target.value))} />
              </div>

              <button
                type="submit"
                className="btn btn-soft bg-transparent text-2xs cursor-pointer border-green-500 p-2 my-5 font-semi-bold hover:bg-green-200"
              >
                Noter
              </button>
            </div>

          </form>

        </div>
      </dialog>
    </div>

  )
}



// export const sendFeedbackEvent = (isPositive: boolean) => {
//   if (typeof window === "undefined" || !window.gtag) return;

//   window.gtag("event", "user_feedback", {
//     feedback: isPositive ? "positive" : "negative",
//     page_path: window.location.pathname,
//   });
// };

