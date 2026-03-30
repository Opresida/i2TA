import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5511959039121"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-7 right-7 z-[9999] w-[60px] h-[60px] rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      style={{ backgroundColor: "#25D366", boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)" }}
      animate={{
        boxShadow: [
          "0 4px 20px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.5)",
          "0 4px 20px rgba(37,211,102,0.45), 0 0 0 14px rgba(37,211,102,0)",
          "0 4px 20px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0)",
        ],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 6px 28px rgba(37, 211, 102, 0.65)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="#fff"
        aria-hidden="true"
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.822 6.5L4 29l7.688-1.794A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 26 16 26a9.94 9.94 0 0 1-5.063-1.373l-.36-.215-4.567 1.065 1.098-4.453-.234-.374A9.943 9.943 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.172 5c-.213 0-.558.08-.851.396-.293.316-1.12 1.094-1.12 2.668 0 1.573 1.145 3.094 1.305 3.308.16.214 2.238 3.572 5.527 4.868 2.73 1.082 3.289.867 3.883.813.594-.054 1.916-.783 2.185-1.539.268-.756.268-1.404.188-1.539-.08-.134-.294-.214-.617-.373-.322-.16-1.916-.945-2.21-1.053-.294-.107-.509-.16-.723.16-.215.32-.83 1.054-.938 1.27-.107.214-.214.24-.536.08-.322-.16-1.36-.502-2.591-1.6-.958-.854-1.604-1.907-1.793-2.228-.188-.32-.02-.493.141-.652.146-.143.322-.373.483-.56.16-.187.214-.32.32-.534.107-.214.054-.4-.027-.56-.08-.16-.709-1.736-.98-2.375-.254-.613-.516-.529-.723-.538l-.616-.01z" />
      </svg>
    </motion.a>
  );
}
