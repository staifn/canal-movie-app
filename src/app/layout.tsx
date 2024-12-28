import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canal +",
  description: "Vos films et séries Canal +",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
