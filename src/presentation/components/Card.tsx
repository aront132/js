import React from "react";
import "./Card.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return <div className={`custom-card ${className}`}>{children}</div>;
};

export default Card;
