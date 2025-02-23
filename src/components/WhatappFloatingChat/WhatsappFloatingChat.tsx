import { motion } from "framer-motion";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const WhatsAppChat = () => {
  const whatsappNumber = "1234567890"; // Replace with your WhatsApp number
  const whatsappMessage = encodeURIComponent("Hello! I need some help.");

  const telegramUsername = "fbbmkinga"; // Replace with your Telegram username

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.div
        className="p-3 bg-green-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-green-600"
        onClick={() =>
          window.open(
            `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
            "_blank"
          )
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaWhatsapp size={32} />
      </motion.div>

      {/* Telegram Button */}
      <motion.div
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
        onClick={() =>
          window.open(`https://t.me/${telegramUsername}`, "_blank")
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FaTelegramPlane size={32} />
      </motion.div>
    </div>
  );
};

export default WhatsAppChat;
