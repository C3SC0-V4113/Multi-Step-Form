import { motion } from "framer-motion";

export const AnimatedDiv = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
};
