import { useState, useEffect, useCallback } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  );
  const checkMobile = useCallback(function () {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", checkMobile);
  }, [isMobile]);
  return isMobile;
};

export default useIsMobile;
