"use client"
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

type CapturePicturesProps = {
    setUpLoadedImages: React.Dispatch<React.SetStateAction<File[]>>;
    setIsCameraOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCameraOpen: boolean;
};

export default function CapturePictures({ setUpLoadedImages, setIsCameraOpen, isCameraOpen }: CapturePicturesProps) {

    
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Fonction pour ouvrir la caméra
    const openCamera = async (mode: 'user' | 'environment' = 'user') => {
        try {
            // Fermer le stream précédent si existant
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: mode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });

            setStream(mediaStream);
            setIsCameraOpen(true);
            setFacingMode(mode);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                await videoRef.current.play();
            }

        } catch (error) {
            console.error('Erreur lors de l\'accès à la caméra :', error);
            toast.error('Impossible d\'accéder à la caméra');
        }
    };

    // Fonction pour changer de caméra
    const switchCamera = () => {
        const newMode = facingMode === 'user' ? 'environment' : 'user';
        openCamera(newMode);
    };

    // Fonction pour fermer la caméra
    const closeCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    // Fonction pour capturer la photo
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], `capture-${Date.now()}.jpg`, {
                    type: 'image/jpeg'
                });

                setUpLoadedImages(prev => [file, ...prev]);
                toast.success('Photo capturée avec succès !');
                closeCamera();
            }
        }, 'image/jpeg', 0.95);
    };

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);
    const handleImageCapture = () => {
        openCamera('user');
    };
    return (
        isCameraOpen && (
            <div className="fixed inset-0 z-50 bg-black flex flex-col">
                {/* Header avec infos */}
                <div className="bg-black/50 p-4 text-white text-center">
                    <p className="text-sm">Positionnez et appuyez sur le bouton pour capturer</p>
                </div>

                {/* Vidéo en direct */}
                <div className="flex-1 relative overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />

                    {/* Canvas caché */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Bouton switch caméra (mobile uniquement) */}
                    <button
                        onClick={switchCamera}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                        aria-label="Changer de caméra"
                    >
                        🔄
                    </button>
                </div>

                {/* Contrôles */}
                <div className="bg-black/80 p-6 flex items-center justify-between">
                    {/* Bouton Annuler */}
                    <button
                        onClick={closeCamera}
                        className="px-6 py-3 bg-red-500/80 hover:bg-red-500 text-white rounded-lg font-medium transition backdrop-blur-sm"
                    >
                        ✕ Annuler
                    </button>

                    {/* Bouton Capturer (grand et centré) */}
                    <button
                        onClick={capturePhoto}
                        className="w-20 h-20 bg-white rounded-full border-[6px] border-white/30 hover:border-blue-400 transition transform active:scale-90 shadow-lg"
                        aria-label="Prendre une photo"
                    >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                    </button>

                    {/* Info caméra */}
                    <div className="text-white text-sm text-center w-24">
                        <p>{facingMode === 'user' ? '🤳 Avant' : '📷 Arrière'}</p>
                    </div>
                </div>
            </div>
        )
    )
}