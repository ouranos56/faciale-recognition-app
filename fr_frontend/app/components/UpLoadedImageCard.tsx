import React, { useState, useEffect, useMemo } from 'react';
import CardImage from './CardImage';
import "../globals.css";


type UpLoadedImageCardProps = {
    images?: File[];
    handlesetselectedImages: (img: File) => void;
    loadingpage?: boolean;
}


const UpLoadedImageCard = ({ images, handlesetselectedImages, loadingpage }: UpLoadedImageCardProps) => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    // Memoiser les URLs pour éviter de les recréer à chaque rendu
    const imgList = useMemo(() => {
        return (images ?? []).map((img) => ({
            file: img,
            key: `${img.name}-${img.lastModified}`,
            url: URL.createObjectURL(img)
        }));
    }, [images]);

    // cleanup des object URLs
    useEffect(() => {
        const urls = imgList.map(i => i.url);
        return () => urls.forEach(u => URL.revokeObjectURL(u));
    }, [imgList]);



    // Mémorise le nombre d'images cochées
    const [selectedCount, setSelectedCount] = useState(0);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, img: File) => {
        const isChecked = e.target.checked;
        const currentChecked = checkedItems[index] || false;
        handlesetselectedImages(img);

        // Si on décoche
        if (!isChecked && currentChecked) {
            setCheckedItems(prev => ({
                ...prev,
                [index]: false
            }));
            setSelectedCount(prev => prev > 0 ? prev - 1 : 0);
            return;
        }

        // Si on coche et qu'on n'a pas encore 2 images
        if (isChecked && selectedCount < 2) {
            setCheckedItems(prev => ({
                ...prev,
                [index]: true
            }));
            setSelectedCount(prev => prev + 1);
        } else if (isChecked && selectedCount >= 2) {
            // Si on essaie de cocher une 3ème image
            e.preventDefault(); // Empêche la checkbox de se cocher
        }

    }

    const toggleCheckbox = (index: number, img: File) => {
        if (loadingpage) return;
        handlesetselectedImages(img);
        const currently = !!checkedItems[index];
        if (currently) {
            setCheckedItems((prev) => ({ ...prev, [index]: false }));
            setSelectedCount((prev) => (prev > 0 ? prev - 1 : 0));
            return;
        }
        if (selectedCount >= 2) return;
        setCheckedItems((prev) => ({ ...prev, [index]: true }));
        setSelectedCount((prev) => prev + 1);        
    };

    useEffect(() => {
        if (loadingpage) {
            setCheckedItems({});
            setSelectedCount(0); // Réinitialise le compteur
        }
    }, [loadingpage]);

    return (
        <div className="grid grid-cols-2 gap-2.5 overflow-scroll md:overflow-scroll p-2  uploadedimagecard">
            {imgList && imgList.map((item, i) => {
                return (
                    <div key={item.key}>

                        <div 
                            className="card1 card card-sm p-0.5"
                            onClick={(e) => {
                                // si on clique directement sur l'input, laisser son onChange gérer
                                const tgt = e.target as HTMLElement;
                                if (tgt && tgt.tagName.toLowerCase() === "input") return;
                                e.preventDefault();
                                toggleCheckbox(i, item.file);
                            }}
                        >
                            <input
                                type="checkbox"
                                name={`checkbox-${i}`}
                                id={`checkbox-${i}`}
                                checked={!!checkedItems[i] || false}
                                onChange={(e) => handleCheckboxChange(e, i, item.file)}
                                disabled={loadingpage}
                                className=" checkbox checkbox-success absolute top-3.5 right-1 z-[8] bg-white/80 border-2 rounded-md w-5 h-5 hover:border-green-400 transition-colors checked:text-green-500 checked:border-green-500 disabled:bg-gray-200 disabled:opacity-65 disabled:cursor-auto"
                            />

                            <CardImage
                                src={item.url}
                                alt={`Uploaded Image ${i}`}
                                sizeClass="h-[20vh] w-[23vw]"
                                priority={i < 4}
                                loading={i < 4 ? "eager" : "lazy"}
                            />
                        </div>
                    </div>
                )
            }
            )}

            {/* <div className="skeleton h-32 w-32" key={`${img}-${i}`}
            </div> */}
        </div>
    );
};

export default UpLoadedImageCard;