import { useState } from "react";

export const useMouseEnter = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return { isHovering, handleMouseEnter, handleMouseLeave };
}

