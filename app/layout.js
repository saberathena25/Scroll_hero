import "./globals.css";

export const metadata = {
  title: "Welcome Home | Scroll-driven hero",
  description:
    "A scroll-driven hero section: a hand-drawn car drives down the page as you scroll. Built with Next.js, Tailwind CSS and GSAP.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4efe6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        {/* If JavaScript is off, show everything instead of leaving the intro elements hidden. */}
        <noscript>
          <style>{`[data-in]{opacity:1 !important}.stat-body{opacity:1 !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
