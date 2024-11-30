import NavBar from "../shared/NavBar";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
