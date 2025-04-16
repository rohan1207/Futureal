import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function ContactUs() {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6 mt-[85px]">
      {/* Map & Contact Info */}
      <div className="relative w-full h-[500px] mb-10">
      <div 
    className="w-full h-full rounded-lg cursor-pointer relative"
    onClick={() => window.open('https://maps.app.goo.gl/3ybXd8cSga1xAThp7', '_blank')}
  >
    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 z-0 rounded-lg"></div>
    <iframe
      className="w-full h-full rounded-lg relative z-10"
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d62211.784140950156!2d77.6887048235658!3d12.956712310582938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s72%2F12%2C%20Nallurahalli%20Main%20Rd%2C%20Near%20Shell%20Petrol%20Pump%2C%20Whitefield%2C%20Bangalore%C2%A0-%C2%A0560066!5e0!3m2!1sen!2sin!4v1744721057649!5m2!1sen!2sin"
      width="600"
      height="450"
      style={{ border: "0" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
      </div>

      {/* Contact Form & Business Hours */}
      <div className="grid md:grid-cols-2 gap-10">
        <ContactForm />
      </div>
    </div>
    <Footer/>
    </>);
}
























