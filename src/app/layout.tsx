import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MuiThemeProvider from '@/providers/ThemeProvider';
import { Roboto } from 'next/font/google';
import './globals.css';
import './global-keyframes.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Animation Studio',
  description:
    'Generate CSS animations! Browse through a library of awesome CSS animations and customize them to fit your webpage!',
  icons: {
    icon: '/favicon.svg',
  },
  creator: 'ikcede',
  applicationName: 'CSS Animation Studio',
  keywords: ['CSS', 'animation', 'Next.js', 'React'],
  category: 'technology',
  verification: {
    google: 'OuhtGpBdn01qnrg4IMaMaMmKmbwrjlPlWL57xhfWa0o',
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
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </AppRouterCacheProvider>

        <GoogleAnalytics gaId="G-2K0RN5BVR3" />
      </body>
    </html>
  );
}
