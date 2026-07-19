import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-16 w-16 rounded-full bg-primary"
      />
    </div>
  );
}