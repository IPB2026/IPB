import type { Metadata } from 'next';
import { adminFont } from './fonts';

// Tout le back-office est exclu de l'indexation.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`admin-scope ${adminFont.variable} font-[family-name:var(--font-admin)] antialiased [font-feature-settings:'cv02','cv03','cv04','cv11']`}
    >
      {children}
    </div>
  );
}
