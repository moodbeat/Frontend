import React, { useState, useEffect } from "react";
import styles from "./BackToTopButton.module.scss";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const headerHeight = 120;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollPosition > headerHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button className={styles.button} onClick={scrollToTop}></button>
      )}
    </>
  );
};

export default BackToTopButton;
