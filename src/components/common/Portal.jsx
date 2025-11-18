import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = document.getElementById("overlay");

  // Safe fallback if overlay is missing
  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};

export default Portal;
