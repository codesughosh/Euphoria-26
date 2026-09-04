"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface ChromeButtonProps extends HTMLMotionProps<"button"> {
  loading?: boolean;
  variant?: "solid" | "outline";
}

export default function ChromeButton({
  children,
  loading,
  variant = "solid",
  className = "",
  disabled,
  ...props
}: ChromeButtonProps) {
  const base =
    "w-full rounded-xl py-3 px-6 text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "solid"
      ? "chrome-btn"
      : "chrome-border text-white hover:bg-white/5";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </motion.button>
  );
}
