import Image from 'next/image'
import React from 'react'

interface CardImageProps {
  src: string;
  alt: string;
  sizeClass?: string;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, sizeClass, className, priority, loading }) => {
  return (
    <div className='avatar '>
      <div className={` mask mask-squircle ${sizeClass} ${className || ''} overscroll-auto bg-center bg-cover`}>
        <Image
          src={src}
          alt={alt}
          quality={100}
          className='object-cover'
          height={500}
          width={500}
          priority={priority}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default CardImage