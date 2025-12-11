import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'CatMash - Trouve le chat le plus mignon',
  description: 'Votez pour les chats les plus mignons et découvrez le classement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}