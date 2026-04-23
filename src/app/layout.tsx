import { type FC, type ReactNode } from "react";

import { fontPrimary, fontSecondary } from "@/config/fonts";
import { ThemeProvider } from "@/pkg/theme";
import { Toaster } from "@/pkg/theme/ui/sonner";

import "@/config/styles/global.css";

// interface
interface IProps {
  children: ReactNode;
}

// component
const RootLayout: FC<Readonly<IProps>> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${fontPrimary.className} ${fontSecondary.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-center" duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
