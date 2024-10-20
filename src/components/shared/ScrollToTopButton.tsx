import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../styles/scrollToTop.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${
        isVisible ? "flex" : "hidden"
      }  fixed bottom-6 right-8 h-10 w-10 lg:h-16 lg:w-16 rounded-full border-2 bg-secondary-700 border-secondary-300 cursor-pointer z-[999999] lg:text-xl  justify-center items-center bg-opacity-80 text-white`}
      onClick={scrollToTop}
    >
      <span className={`${styles.arrow}`}>
        <FaArrowUp></FaArrowUp>
      </span>
    </button>
  );
};

export default ScrollToTopButton;
