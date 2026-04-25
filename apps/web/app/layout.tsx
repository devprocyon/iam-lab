import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description: "Integration with IAM platform using OIDC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
