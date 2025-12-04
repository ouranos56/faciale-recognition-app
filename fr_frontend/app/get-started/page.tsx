"use client"

import React, { useState, useEffect, useCallback, useRef, /*useCallback*/ } from "react";
import fr_api from "../fr_api";
import "../globals.css";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import PredictCard from "../components/PredictCard";
import UpLoadedImageCard from "../components/UpLoadedImageCard";
import { useCtrlI } from "../hookq/useCtrlI";
import { useEnter } from "../hookq/useEnter";
import { BrushCleaning, Camera, ClockArrowUp, Facebook, GitCompareArrows, Linkedin } from "lucide-react";
import Image from "next/image";
import PictureGif from "../assets/picture.gif";
import Compare2PersonsGif from "../assets/social-distance.gif";
import CapturePictures from "../components/CapturePictures";
// import Compare2PersonsGif from "./assets/population.gif";


// export
type FRApiresponse = {
  id: string;
  img1: string;
  img2: string;
  selected_model: number;
  prediction: string;
  rigthprediction: string;
  date_uploaded: string;
  session_id: string;
};



// Fonction utilitaire pour parser la prédiction
const parsePredictionValue = (prediction: string | null | undefined): boolean => {
  if (!prediction) return false;
  try {
    const [value] = prediction.split('_').map(Number);
    return value !== 0;
  } catch (error) {
    console.error('Erreur lors du parsing de la prédiction:', error);
    return false;
  }
};

export default function Home() {
  const [frpredictions, setFrpredictions] = useState<FRApiresponse[]>([]);
  const [newU, setNewU] = useState<boolean>(true);
  const [sid, setSid] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [loadingPostPred, setLoadingPostPred] = useState<boolean>(false);
  const [loadedBtn, setUpLoadedBtn] = useState<boolean>(false);

  const [upLoadedImages, setUpLoadedImages] = useState<File[]>([]);
  const [selectedImages, setselectedImages] = useState<File[]>([]);

  const selectedModelRef = useRef<HTMLSelectElement>(null);
  const [selectedmodel, setSelectedmodel] = useState<number>(0);

  const clickInputFileRef = useRef<HTMLInputElement>(null);
  const clickSendPredictFilesRef = useRef<HTMLButtonElement>(null);



  // const saveSessionId = (sessionId?: string | null) => {
  //   // Ne rien faire si valeur invalide
  //   if (!sessionId || sessionId === "undefined") {
  //     console.warn("saveSessionId: sessionId invalide, ignore.");
  //     return null;
  //   }
  //   localStorage.setItem('client_session_id', sessionId as string);
  //   return sessionId as string;}




  const getOrCreateClientSessionId = () => {
    // Nettoyage si "undefined" a été stocké par erreur
    const raw = localStorage.getItem('client_session_id');
    if (raw === 'undefined') localStorage.removeItem('client_session_id');

    let sid = localStorage.getItem('client_session_id');
    // if (sid) {
    //   setNewU(false);
    //   toast.success("Bon retour !")
    // }

    if (!sid) {
      sid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
        ? (crypto).randomUUID()
        : uuidv4();
      localStorage.setItem('client_session_id', sid as string);
      toast.success("Bienvenu !")
      setNewU(false);
    }

    setSid(sid);
    return sid;
  };

  // Utiliser avant tout fetch
  useEffect(() => {
    getOrCreateClientSessionId();
  }, []);


  // const getPredictions = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fr_api.get<FRApiresponse[]>("predictions/");
  //     setFrpredictions(res.data ?? []);
  //     toast.success("Prédictions récupérées avec succès !");

  //   } catch (error) {
  //     console.error("Erreur de récupération des prédictions:", error);

  //     const existingsid = localStorage.getItem('client_session_id');
  //     clientsessionId();

  //     if (existingsid && existingsid !== "undefined") {
  //       toast.error("Erreur de récupération des prédictions !");
  //       return;
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [setFrpredictions]);

  // const clientsessionId = () => {
  //   // Utilise crypto.randomUUID() si dispo (modern browsers)
  //   const existingsid = localStorage.getItem('client_session_id');
  //   if (existingsid && existingsid !== "undefined") {
  //     setSid(existingsid);
  //     toast.success("Bon retour !")
  //     return existingsid;
  //   }

  //   toast.success("Bienvenu !")
  //   const newSid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
  //     ? (crypto).randomUUID()
  //     : uuidv4();

  //   console.log("Generated new session ID:", newSid);
  //   localStorage.setItem('client_session_id', newSid);
  //   setSid(newSid);
  //   return newSid;
  // };



  const getPredictions = useCallback(async () => {
    setLoading(true);
    try {
      // const sid = getOrCreateClientSessionId();
      const res = await fr_api.get<FRApiresponse[]>("predictions/", {
        params: { session_id: sid }
      });

      await new Promise(resolve => setTimeout(resolve, 3600));

      setFrpredictions(res.data ?? []);

      if (!newU) {
        toast.success("Prédictions récupérées avec succès !");
      }

    } catch (error) {
      console.error("Erreur de récupération des prédictions:", error);

      if (!newU) {
        toast.error("Erreur de récupération des prédictions !");
      }
    } finally {
      setLoading(false);
    }
  }, [newU, sid]);



  const saveclientuploadedimages = () => {
    const valueToStore: File[] = upLoadedImages.length > 0
      ? upLoadedImages
      : [];

    try {
      localStorage.setItem('client_uploaded_images', JSON.stringify(valueToStore));
    } catch (e) {
      console.error("Erreur lors de la sauvegarde des images téléchargées:", e);
    }
    return valueToStore;
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);

    // Ajouter un délai de 2 secondes avant de mettre à jour l'état
    await new Promise(resolve => setTimeout(resolve, 2500));

    setUpLoadedImages(prev => Array.isArray(prev) ? [...Array.from(files), ...prev] : Array.from(files));
    setUploading(false);
  };

  const handleSendCorrection = async (id: string, rightprediction: number) => {
    try {
      // Créer une promesse qui combine la requête API et le délai
      const reqpromise = fr_api.patch(
        `predictions/${id}/`,
        {
          rightprediction: rightprediction
        }
      ).then(async response => {

        // Ajouter un délai de 2 secondes après la réponse
        await new Promise(resolve => setTimeout(resolve, 2000));
        return response; // Retourner la réponse pour la chaîne de promesses
      });

      // Utiliser toast.promise avec la promesse modifiée
      toast.promise(
        reqpromise,
        {
          loading: 'Envoi de la correction...',
          success: 'Correction envoyée avec succès !',
          error: 'Erreur lors de l\'envoi de la correction !',
        },
        {
          duration: 3000, // Durée d'affichage des toasts success/error
        }
      ).then(async response => {
        // Ajouter un délai de 2 secondes après la réponse
        await new Promise(resolve => setTimeout(resolve, 2000));
        return response
      });
      toast.success("Merci pour votre contribution !");

    } catch (error) {
      console.error("Erreur lors de l'envoi de la correction:", error);
    }
  }

  const handlesetselectedImages = (img: File) => {
    setselectedImages((prevImgs) => {
      const newImg = prevImgs.includes(img)
        ? prevImgs.filter((i) => i !== img)  // Désélection
        : prevImgs.length < 2                 // Vérification de la limite
          ? [...prevImgs, img]                // Sélection
          : prevImgs;                         // Pas de changement si déjà 2 sélectionnées

      // Log avec la nouvelle valeur
      console.log("selectedImages " + (prevImgs.includes(img) ? "removed" : "added") + ":", {
        previous: prevImgs,
        new: newImg,
        img: img,
        count: newImg.length
      });

      return newImg;
    });
  };

  const handlePostImageToPredict = async () => {
    setLoadingPage(true);
    try {

      if (selectedImages.length !== 2) {
        toast.error("Veuillez sélectionner 2 images")
        throw new Error("Veuillez sélectionner exactement 2 images");
      }

      const file1 = selectedImages[0];
      const file2 = selectedImages[1];
      const selected_model = selectedmodel;
      const sid = getOrCreateClientSessionId();

      const loadingToast = toast.loading("Envoi des images pour prédiction...");

      // FormData pour envoyer les fichiers
      const formData = new FormData();

      formData.append('img1', file1);
      formData.append('img2', file2);
      formData.append('selected_model', selectedmodel.toString());
      formData.append('session_id', sid as string || "");

      // Envoyer la requête avec FormData
      // const response = await 
      const res = await fr_api.post(
        'predictions/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.dismiss(loadingToast);
      toast.success("Images envoyées avec succès !");

      setLoadingPostPred(true)
      setLoading(true);

      // Attendre un peu pour laisser le temps au modèle de faire la prédiction
      await new Promise(resolve => setTimeout(resolve, 3600));

      setLoadingPostPred(false)

      // Récupérer les nouvelles prédictions
      // la prédiction est déjà prête ici
      setFrpredictions((prev) => [res.data, ...prev]);

      setselectedImages([]);

      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi des images:", error);
      if (selectedImages.length === 2) {
        toast.error("Erreur lors de l'envoi des images !");
      }
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    getPredictions();
  }, [getPredictions]);

  // useEffect(() => {
  //   if (frpredictions && frpredictions.length > 0) {
  //     const tsid = frpredictions[0]?.session_id;
  //     saveSessionId(tsid);
  //   };
  // }, [frpredictions]);


  useEffect(() => {
    console.log("État actuel des sélections:", {
      urls: selectedImages,
      count: selectedImages.length
    });
  }, [selectedImages]);

  if (loadingPage) {
    saveclientuploadedimages();
  }

  const onCtrlI = useCallback(() => {
    clickInputFileRef.current?.click();
    console.log("Ctrl/Cmd + I déclenché via hook !");
    // ton code
  }, []);

  useCtrlI(onCtrlI);

  const onEnter = useCallback(() => {
    clickSendPredictFilesRef.current?.click();
    console.log("Enter déclenché via hook !");
    // ton code
  }, []);

  useEnter(onEnter);

  // const handleImageCapture = async () => {
  //   try {
  //     // Demander l'accès à la caméra
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  //     // Créer un élément vidéo pour afficher le flux
  //     const video = document.createElement('video');
  //     video.srcObject = stream;
  //     await video.play();

  //     // Créer un canvas pour capturer l'image
  //     const canvas = document.createElement('canvas');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     // Dessiner l'image sur le canvas
  //     const context = canvas.getContext('2d');
  //     if (context) {
  //       context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     }

  //     // Convertir le canvas en blob
  //     const blob = await new Promise<Blob>((resolve) => {
  //       canvas.toBlob((blob) => {
  //         if (blob) resolve(blob);
  //       }, 'image/jpeg', 0.95);
  //     });

  //     // Créer un fichier à partir du blob
  //     const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });

  //     // Ajouter l'image capturée à la liste
  //     setUpLoadedImages(prev => [file, ...prev]);

  //     // Arrêter la caméra
  //     stream.getTracks().forEach(track => track.stop());

  //     toast.success('Image capturée avec succès !');
  //   } catch (error) {
  //     console.error('Erreur lors de la capture :', error);
  //     toast.error('Erreur lors de la capture de l\'image');
  //   }
  // };





  // const handleImageCapture = () => {
  //   openCamera('user');
  // };

  const [isCameraOpen, setIsCameraOpen] = useState(false);




  const predictionsContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroller doucement jusqu'en haut du conteneur quand la liste change
  useEffect(() => {
    // if (!predictionsContainerRef.current) return;
    // if (frpredictions.length === 0) return;
    // // petit délai pour s'assurer que le DOM est mis à jour
    // const t = setTimeout(() => {
    //   const el = predictionsContainerRef.current!;
    //   el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    // }, 50);
    // return () => clearTimeout(t);


    if (!predictionsContainerRef.current) return;
    const firstEl = predictionsContainerRef.current.children[0] as HTMLElement | null;
    if (firstEl && frpredictions.length > 0) {
      // ex: scroller doucement jusqu'au premier
      firstEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // ou faire autre chose : firstEl.querySelector('img') etc.
    }
  }, [frpredictions]);



  const scrollToPred = () => {
    if (!predictionsContainerRef.current) return;

    const firstEl = predictionsContainerRef.current.children[0] as HTMLElement | null;
    if (firstEl) {
      // ex: scroller doucement jusqu'au premier
      firstEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // ou faire autre chose : firstEl.querySelector('img') etc.
    }
  };


  // const [send, setSend] = useState<{ success?: string; error?: string }>({});
  // useEffect(() => {
  //   if (send.success) {
  //     toast.success(send.success);
  //     setTimeout(() => setSend({}), 1000);
  //     return;
  //   }
  //   if (send.error) {
  //     toast.error(send.error);
  //     setTimeout(() => setSend({}), 1000);
  //   }
  // }, [send]);



  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 120);
    setShowImage(false);
    return () => clearTimeout(timer);
  }, []);



  return (
    <>
      {/* ------------------------ Get Started -------------------- */}


      <div className={`w-[75vw] md_body px48 bg-[#f7f5f35b] flex md:flex-row justify-center items-center md:gap-12 ${frpredictions.length !== 0 || upLoadedImages.length !== 0 ? "min-h-screen py-20" : "py-6 h-svh "} `}>
        <div className="loader z-20"></div>

        <div className={`bg-base-100 md_preds shadow-xl rounded-box border-3 border-base-content/12 justify-center items-center gap-4 p-2 overflow-auto md:overflow-scroll uploadedimagecard md:w-[80%] ${frpredictions.length === 0 ? "max-h-min" : " h-[90vh]"}`}
          ref={predictionsContainerRef}
        >
          {
            frpredictions.length === 0
              ? loading
                ?
                <div className="flex justify-center items-center">

                  {/* <div className="loader1 z-20"></div> */}
                  <div className="loader3 z-20"></div>

                  <div className="flex w-3/4 h-3/4 flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>

                : <div className="flex justify-center items-center p-3">

                  <Image
                    src={Compare2PersonsGif}
                    unoptimized
                    alt="Aperçu de l'image"
                    width={250}
                    height={250}
                    priority
                    className={`opacity-40 hover:opacity-55 transition-opacity duration-300 ${showImage ? 'flex' : 'hidden'}`}
                  />
                </div>

              : (<div className="justify-center items-center ">
                <div className={`flex my-4 h-3/4 flex-col gap-4 ${loadingPostPred ? 'flex' : 'hidden'}`}>
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>

                {frpredictions.map((fr, i) => (
                  <PredictCard
                    key={"predictcard-" + fr.id}
                    fr={fr}
                    index={frpredictions.length - i}
                    predValue={parsePredictionValue(fr.prediction)}
                    handleSendCorrection={handleSendCorrection}
                  />
                ))}
              </div>)
          }
        </div>

        <div className={`card md_uploads bg-base-200/65 shadow-xl/20 mb-5 p-3 flex flex-col justify-between items-center gap-3 md:w-3/6 ${frpredictions.length === 0 || upLoadedImages.length === 0 ? "max-h-min" : "h-[85vh] "}`}>
          {
            upLoadedImages.length === 0
              ? loading && !loadedBtn
                ? (
                  <div className="grid grid-cols-2 gap-2.5 border-dashed border-accent/15 border-4 p-2 justify-center items-center rounded-2xl">
                    <div className="skeleton h-32 w-30"></div>
                    <div className="skeleton h-32 w-30"></div>
                  </div>
                )

                : <div className="flex justify-center items-center border-dashed border-accent/15 border-bb4e0041 border-4 rounded-2xl py-0.5">
                  {showImage && (
                    <Image
                      src={PictureGif}
                      unoptimized
                      alt="Aperçu de l'image"
                      width={225}
                      height={225}
                      priority
                      className={`opacity-40 hover:opacity-50 transition-opacity duration-300 ${showImage ? 'block' : 'hidden'}`}
                    />
                  )}
                </div>
              // h-86
              : (<div className="border-dashed border-accent/15 border-bb4e0041 border-4 rounded-2xl overflow-auto md:overflow-scroll uploadedimagecard max-h-[55vh]">
                {
                  uploading
                    ? <div className="grid grid-cols-2 gap-2.5">
                      <div className="skeleton h-32 w-32"></div>
                      <div className="skeleton h-32 w-32"></div>
                    </div>
                    : null
                }

                <UpLoadedImageCard
                  images={upLoadedImages}
                  handlesetselectedImages={handlesetselectedImages}
                  loadingpage={loadingPage}
                />
              </div>)
          }


          <div className="flex flex-col justify-center items-center gap-4">

            <select
              className="select select-sm rounded-xl px-2 focus-within:border-0"
              ref={selectedModelRef}
              value={selectedmodel}
              onChange={(e) => { setSelectedmodel(Number(e.target.value)) }}
            >
              <option disabled={true}>Models</option>
              <option defaultChecked value={0} >Ediya s.2</option>
              <option value={1} >Ediya s.06</option>
            </select>

            <div className="flex flex-row justify-center w-full items-center gap-4">
              <button className="btn btn-soft h-9 p-3 bg-transparent hover:bg-green-200 hover:scale-105 transition-all border-2 border-green-500 hover:border-green-00 text-green-600 hover:text-green-800 btn-success btn-sm"
                onClick={() => { handlePostImageToPredict(); }}
                title="Ctrl + Enter"
                ref={clickSendPredictFilesRef}
              >Comparer
                <GitCompareArrows size={17} color="#14a800" strokeWidth={1.75} />
              </button>

              {/* <button
                className="hidden btn btn-warning btn-sm h-9 w-9 p-2 bg-transparent border-green-200 hover:scale-105 transition-all"
                onClick={() => { setIsCameraOpen(true) }}
                disabled={true}
              >
                <Camera size={16} color="#14a800" strokeWidth={1.75} />
              </button>
              <CapturePictures setUpLoadedImages={setUpLoadedImages} setIsCameraOpen={setIsCameraOpen} isCameraOpen={isCameraOpen} /> */}




              <button
                className="btn btn-error btn-sm h-9 w-9 p-2 bg-transparent hover:bg-red-200 hover:scale-105 transition-all"
                onClick={() => {
                  setUpLoadedImages([]);
                  setselectedImages([]);
                }}
              >
                <BrushCleaning size={17} color="#ff4242" strokeWidth={1.75} />
              </button>

            </div>

            {/* <div className="input rounded-xl justify-center items-center gap-2 border-2 focus:border-amber-700">
          </div> */}
            <fieldset className="fieldset">

              <legend className="flex flex-row justify-center items-center fieldset-legend opacity-55">
                Importer des images
                <div className="flex flex-row justify-center items-center gap-1 ">
                  <kbd className="kbd kbd-sm text-amber-700">Ctrl/⌘</kbd>
                  <p className="text-lg text-amber-700">+</p>
                  <kbd className="kbd kbd-sm text-amber-700">i</kbd>
                </div>

              </legend>

              <input type="file" accept="image/*" className="file-input rounded-xl hover:shadow-md hover:border-amber-800/50"
                onChange={(e) => { handleImageChange(e); setUpLoadedBtn(true); }}
                multiple={true}
                ref={clickInputFileRef}
              />
              {/* <label className="label">Max size 2MB</label> */}
            </fieldset>
          </div>

        </div>


        <button
          className="btn btn-ghost btn-circle fixed bottom-10 right-8"
          onClick={() => scrollToPred()}
          title="Remonter à la dernière prédction!"
        >
          <ClockArrowUp size={30} color="#b95b04" strokeWidth={2} />
        </button>
      </div>
    </>
  );
}