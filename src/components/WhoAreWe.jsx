import { motion } from "framer-motion";
import { FaEye, FaSuitcase, FaBullseye } from "react-icons/fa";

export default function WhoAreWe() {
  return (
    <section className="relative bg-[#f4f6fb] py-20 px-6 md:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Who Are We?
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          We specialise in turnkey solutions for healthcare, industrial, hospitality, office
          spaces and educational sectors. Leveraging our global experience and local
          expertise, we bring your vision to life seamlessly and efficiently.
        </p>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
        >
          <FaSuitcase className="text-4xl text-gradient mb-4" />
          <h3 className="text-2xl font-semibold mb-2">About Us</h3>
          <p className="text-gray-600">
            We deliver turnkey solutions for diverse sectors. With global insight and local
            knowledge, we execute seamless and efficient project delivery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
        >
          <FaEye className="text-4xl text-gradient mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Vision</h3>
          <p className="text-gray-600">
            To revolutionize turnkey project delivery as a service—blending innovation,
            precision, and empathy to create exceptional value for our clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
        >
          <FaBullseye className="text-4xl text-gradient mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Mission</h3>
          <p className="text-gray-600">
            To deliver seamless, service-driven solutions that create value, optimize
            returns, and set new benchmarks in quality, innovation, and standards.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(to right, #4285F4, #9b59b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}