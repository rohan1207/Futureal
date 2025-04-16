import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ContactUs() {
  const [isMapLoading, setIsMapLoading] = useState(true);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-[85px]">
        {/* Map & Contact Info */}
        <div className="relative w-full h-[350px] mb-10">
          <div
            className="w-full h-full rounded-lg cursor-pointer relative bg-white"
            onClick={() => window.open('https://maps.app.goo.gl/3ybXd8cSga1xAThp7', '_blank')}
          >
            {isMapLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-[#2A72F8] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading map...</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-white bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 z-0 rounded-lg"></div>
            <iframe
              className="w-full h-full rounded-lg relative z-10"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62211.784140950156!2d77.6887048235658!3d12.956712310582938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s72%2F12%2C%20Nallurahalli%20Main%20Rd%2C%20Near%20Shell%20Petrol%20Pump%2C%20Whitefield%2C%20Bangalore%C2%A0-%C2%A0560066!5e0!3m2!1sen!2sin!4v1744721057649!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoading(false)}
            ></iframe>
          </div>
        </div>

        {/* Contact Form & Business Hours */}
        <div className="grid md:grid-cols-2 gap-10">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
























