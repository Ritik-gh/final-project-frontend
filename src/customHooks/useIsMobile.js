import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  );
  function checkMobile() {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", checkMobile);
  }, [isMobile]);
  return isMobile;
};

export default useIsMobile;
