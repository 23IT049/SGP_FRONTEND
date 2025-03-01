// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   const isAuthPage = ["/auth/login", "/user/signup"].includes(
//     location.pathname
//   );

//   if (isAuthPage) return null;

//   return (
    
//     <footer className="bg-primary-dark text-primary-light">
//       <div className="bg-primary-light text-black text-center p-6">
//         <h2 className="text-xl font-semibold mb-2">Stay Updated</h2>
//         <p className="text-base mb-4">
//           Subscribe to our newsletter for the latest stamp releases, collecting
//           tips, and community events.
//         </p>
//         <div className="flex justify-center">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-4 py-2 w-96 border border-input-dark-border rounded-l-lg focus:outline-none"
//           />
//           <button className="px-4 py-2 bg-accent-dark border-2 border-border-dark text-black rounded-r-lg">
//             Subscribe
//           </button>
//         </div>
//       </div>

//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-center py-6">
//         <div className="text-center">
//           <h3 className="font-semibold mb-3">Quick Links</h3>
//           <ul>
//             <li>
//               <a href="#" className="hover:underline">
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 FAQs
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Privacy Policy
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="text-center">
//           <h3 className="font-semibold mb-3">Community</h3>
//           <ul>
//             <li>
//               <a href="#" className="hover:underline">
//                 Forum
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Events
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Blog
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Stamp Exchange
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="text-center">
//           <h3 className="font-semibold mb-3">Connect With Us</h3>
//           <div className="flex justify-center space-x-4">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <FaFacebook size={24} />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <FaInstagram size={24} />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <FaLinkedin size={24} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // To store success or error message
  const isAuthPage = ["/auth/login", "/user/signup"].includes(location.pathname);

  if (isAuthPage) return null;

  const handleSubscribe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subscribers/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Subscription successful! Please check your email for confirmation.");
      } else {
        setStatus(result.message || "Error subscribing user.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <footer className="bg-primary-dark text-primary-light">
      <div className="bg-primary-light text-black text-center p-6">
        <h2 className="text-xl font-semibold mb-2">Stay Updated</h2>
        <p className="text-base mb-4">
          Subscribe to our newsletter for the latest stamp releases, collecting tips, and community events.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-96 border border-input-dark-border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-accent-dark border-2 border-border-dark text-black rounded-r-lg"
          >
            Subscribe
          </button>
        </div>
        {status && (
          <p className="mt-4 text-lg text-green-500">{status}</p>
        )}
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-center py-6">
        <div className="text-center">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-semibold mb-3">Community</h3>
          <ul>
            <li><a href="#" className="hover:underline">Forum</a></li>
            <li><a href="#" className="hover:underline">Events</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Stamp Exchange</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-semibold mb-3">Connect With Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
