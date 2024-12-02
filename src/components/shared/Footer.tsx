import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {/* Company Info */}
        <div>
          <NavLink to="/" className="flex items-center mb-4">
            <img
              src="/logo.ico"
              className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
              alt="Logo"
            />
            <h1 className="logo sm:text-3xl">FITZONE</h1>
          </NavLink>
          <p className="text-neutral-300 text-sm">
            We provide high-quality products that enhance your well-being. Our
            mission is to bring you the best experience with top-notch service.
          </p>
          <p className="mt-4 text-neutral-400 text-xs">
            &copy; {new Date().getFullYear()} Fitzone. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-neutral-300 text-sm">+1 800 123 4567</li>
            <li className="text-neutral-300 text-sm">support@fitzone.com</li>
            <li className="text-neutral-300 text-sm">
              123 Fitness Ave, New York, NY 10001
            </li>
          </ul>

          <div className="mt-5">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Subscribe to our Newsletter
          </h3>
          <p className="text-neutral-300 text-sm mb-4">
            Get the latest updates and offers directly in your inbox.
          </p>
          <form className="flex w-full max-w-lg ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full flex-1 p-2 rounded-l-lg bg-neutral-100 text-primary-900 outline-none"
            />
            <button
              type="submit"
              className=" p-2 bg-secondary-700 text-white rounded-r-lg hover:bg-secondary-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
