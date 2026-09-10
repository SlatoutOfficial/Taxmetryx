"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#061016",
          color: "#FFFFFF",
          border: "1px solid #D90016",
          borderRadius: "0px",
          fontFamily: "var(--font-sans)",
          padding: "16px 20px",
          fontSize: "14px",
        },
      }}
    />
  );
}
