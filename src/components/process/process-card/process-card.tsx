import React from "react";
import "./process-card.css";

interface ProcessCardProps {
  /** Card width, e.g. "300px" or "100%" */
  width?: string;
  /** Card height, e.g. "420px" or "100%" */
  height?: string;
  /** Image source for the background */
  src: string;
  /** CSS object-position for the image, e.g. "center top" */
  imagePosition?: string;
  /** Zoom factor for the image, 1 = normal, 1.2 = 20% zoom-in */
  imageScale?: number;
  /** 0–1: opacity of dark overlay over the image */
  overlayOpacity?: number;
  /** Step number / label in the top-left */
  stepLabel: string;
  /** Main header text */
  title: string;
  /** Secondary description text */
  body: string;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  width = "100%",
  height = "420px",
  src,
  imagePosition = "center center",
  imageScale = 1,
  overlayOpacity = 0.45,
  stepLabel,
  title,
  body,
}) => {
  return (
    <div className="process-card" style={{ width, height }}>
      <div className="process-card-image-wrapper">
        <img
          src={src}
          alt={title}
          className="process-card-image"
          style={{
            objectPosition: imagePosition,
            transform: `scale(${imageScale})`,
          }}
        />
        <div
          className="process-card-overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        />
      </div>

      <div className="process-card-step-label">{stepLabel}</div>

      <div className="process-card-text">
        <h3 className="process-card-title">{title}</h3>
        <p className="process-card-body">{body}</p>
      </div>
    </div>
  );
};
