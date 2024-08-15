import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MuiThemeProvider from "@/providers/ThemeProvider";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: "Animation Studio",
  description: "Generate and customize CSS animations",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>

        <GoogleAnalytics gaId="G-2K0RN5BVR3" />
      </body>
    </html>
  );
}
