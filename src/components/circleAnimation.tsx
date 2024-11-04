import { motion } from "framer-motion";

const CircleAnimation = () => (
  <motion.div
    className="size-20 rounded-full border-8 border-gray-200 border-t-4 border-t-blue-600"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

export default CircleAnimation;
