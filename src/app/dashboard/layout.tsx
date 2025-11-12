import GiuliaWidget from '@/components/ui/GiuliaWidget';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Dashboard – AI Team',
  description: 'Your AI Team dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* Open Sans font (as in your original widget) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
        {/* Optional: improve font loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        {/* Your existing dashboard shell/header/sidebar goes here */}
        {children}

        {/* Mount Giulia widget globally on all dashboard pages */}
        <GiuliaWidget />
      </body>
    </html>
  );
}
