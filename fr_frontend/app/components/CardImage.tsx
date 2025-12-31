import Image from 'next/image'
import React from 'react'

interface CardImageProps {
  src?: string | undefined;
  alt: string;
  sizeClass?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, sizeClass,  priority, loading }) => {

  const [hasError, setHasError] = useState(false)
  const finalSrc = !src || hasError ? "/assets/fallback.png" : src
  
  return (
    <div className='avatar '>
      <div className={` mask  mask-squircle ${sizeClass} overscroll-contain bg-center bg-cover`}>
        <Image
          src={finalSrc}
          alt={alt}
          quality={100}
          className='object-cover'
          height={500}
          width={500}
          priority={priority}
          loading={loading}
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  )
}

export default CardImage
