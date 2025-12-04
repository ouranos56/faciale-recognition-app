"use client"

import React, { useEffect, useRef, useState } from "react";

type LoopingVideoProps = {
  src: string;
  className?: string;
  // poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
};

export default function LoopingVideo({
  src,
  className,
  // poster,
  // autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "metadata",
}: LoopingVideoProps) {

  const vidRef = useRef<HTMLVideoElement>(null);
  const [clicked, SetClicked] = useState<boolean>(false);

  const hoverPlay = () => {
    const videoElement = vidRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Erreur lors de la lecture de la vidéo au survol :", error);
      }); 
    }
  }
  const hoverDisPlay = () => {
    const videoElement = vidRef.current;
    if (videoElement) {
      videoElement.pause();
    }
  }

  useEffect(() => {
    if (clicked) {
      hoverPlay();
    } else {
      hoverDisPlay();
    }
  }, [clicked]);

  return (
    <video
      ref={vidRef}
      className={className}
      src={src}
      // poster={poster}
      // autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      aria-label="Looping video"
      onMouseOver={() => hoverPlay()}
      onMouseLeave={() => hoverDisPlay()}
      onClick={() => !clicked ? SetClicked(true) : SetClicked(false)}
    >
      
    </video>
  );
}


// export default function LoopingVideo({
//   src,
//   className,
//   autoPlay = true,
//   loop = true,
//   muted = true,
//   playsInline = true,
//   preload = "metadata",
// }: LoopingVideoProps) {
//   console.log("Video src:", src); // Pour vérifier le chemin
  
//   return (
//     <video
//       className={className}
//       src={src}
//       autoPlay={autoPlay}
//       loop={loop}
//       muted={muted}
//       playsInline={playsInline}
//       preload={preload}
//       aria-label="Looping video"
//       onError={(e) => {console.error("Erreur de chargement vidéo:", e)}}
//       onLoadedData={() => {console.log("Vidéo chargée avec succès")}}
//     />
//   );
// }