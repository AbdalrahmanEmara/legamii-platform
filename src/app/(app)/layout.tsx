import Header from "@/components/layout/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-xl4 min-h-screen">
      <Header />
      {children}
    </div>
  );
}
