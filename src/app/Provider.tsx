// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { AppProvider } from "../context/AppProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            className:
              "rounded-xl border backdrop-blur-md shadow-lg transition-colors duration-300",
            classNames: {
              error: "border-red-500/30",
              success: "border-green-800/30",
              warning: "border-yellow-500/30",
              info: "border-[#c2cbd3]/30",
            },
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-text)",
            },
          }}
        />

        {children}
      </AppProvider>
    </QueryClientProvider>
  );
}
