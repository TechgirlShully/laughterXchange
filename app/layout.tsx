import "./globals.css";

export const metadata = {
  title: "LaughterXchange",
  description: "Forex Mentorship & Trading Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
