import React, { useState, useEffect } from "react";
import { getCachedImage, preloadImageCached } from "../../utils/image-cache";

interface FastImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string; // Optional fallback image
}

/**
 * FastImage component - Instant rendering from cache
 * Drop-in replacement for <img> tags
 */
export function FastImage({ src, alt, fallback, ...props }: FastImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if already cached (recalculate on every src change)
    const cachedImage = getCachedImage(src);
    if (cachedImage) {
      setImageSrc(cachedImage.src);
      return;
    }

    // Not cached, load it
    setIsLoading(true);
    preloadImageCached(src)
      .then((img) => {
        setImageSrc(img.src);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("FastImage load failed:", error);
        if (fallback) {
          setImageSrc(fallback);
        }
        setIsLoading(false);
      });
  }, [src, fallback]);

  if (isLoading) {
    return (
      <div
        className={props.className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          ...props.style,
        }}
      >
        {/* Simple spinner */}
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid #999",
            borderTop: "2px solid #fff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      style={{
        imageRendering: "pixelated",
        ...props.style,
      }}
    />
  );
}

export default FastImage;
