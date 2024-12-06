/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import styles from "../styles/contact.module.css";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import Loader from "../components/shared/Loader";
import emailjs from "@emailjs/browser";
import { envConfig } from "../config/envConfig";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setIsLoading(true);
    emailjs
      .sendForm(
        envConfig.EMAILJS_SERVICE_ID,
        envConfig.EMAILJS_TEMPLATE_ID,
        form.current,
        envConfig.EMAILJS_PUBLIC_KEY
      )
      .then(
        (_result: any) => {
          (e.target as HTMLFormElement).reset();
          toast.success("Message sent");
          setIsLoading(false);
        },
        (_error: any) => {
          toast.error("Failed to send message");
          setIsLoading(false);
        }
      );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className="max-w-7xl w-full px-5 md:px-20 mx-auto py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="md:w-1/3 text-white">
            <h2 className="text-3xl font-semibold mb-4">Contact Info</h2>
            <p className="mb-6">
              Have questions or need assistance? Reach out to us using the
              information below or fill out the form.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                  <FaPhoneAlt />
                </span>
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-4">
                  <IoMdMail />
                </span>
                <span>contact@yourdomain.com</span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full mr-4">
                  <FaLocationDot />
                </span>
                <span>123 Business Street, City, Country</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:w-1/3 bg-white p-5 rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full border-b-2 border-gray-300  px-4 py-2 focus:outline-none"
                />
              </div>
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full border-b-2 border-gray-300  px-4 py-2 focus:outline-none"
                />
              </div>
              {/* Subject Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Enter the subject"
                  className="w-full border-b-2 border-gray-300  px-4 py-2 focus:outline-none"
                />
              </div>
              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Write your message here"
                  className="w-full border-b-2 border-gray-300  px-4 py-2 focus:outline-none"
                ></textarea>
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
