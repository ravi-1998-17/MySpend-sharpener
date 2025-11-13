import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = document.getElementById("overlay");
  return createPortal(children, portalRoot);
};

export default Portal;
