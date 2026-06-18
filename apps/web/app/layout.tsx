import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayak Rafting Peru',
  description: 'Turismo de aventura en Cusco, Lima y Arequipa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
