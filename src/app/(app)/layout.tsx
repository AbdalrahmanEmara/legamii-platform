import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BackgroundMain from "@/components/ui/BackgroundMain";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-xl4 w-full">
      <Header />
      <div className="relative min-h-screen">
        <BackgroundMain>{children}</BackgroundMain>
      </div>
      <Footer />
    </div>
  );
}
