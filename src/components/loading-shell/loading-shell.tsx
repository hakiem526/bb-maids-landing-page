import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreloadProgress } from "../../hooks/use-preload-progress";

interface LandingShellProps {
  children: React.ReactNode;
}

export function LandingShell({ children }: LandingShellProps) {
  const state = usePreloadProgress();
  const ready = state.done;

  return (
    <AnimatePresence mode="wait">
      {!ready && (
        <motion.div
          key="landing-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--white)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "4px solid rgba(0,0,0,0.1)",
              borderTopColor: "var(--sky-blue)",
              animation: "spin 0.8s linear infinite",
              marginBottom: 12,
            }}
          />
        </motion.div>
      )}

      {ready && (
        <motion.div
          key="landing-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
