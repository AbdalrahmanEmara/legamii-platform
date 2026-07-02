import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BackgroundMain from "@/components/ui/BackgroundMain";

type AppShellProps = Readonly<{
  children: React.ReactNode;
  headerVariant: "student" | "teacher";
}>;

export default function AppShell({ children, headerVariant }: AppShellProps) {
  return (
    <div className="w-full pt-xl4">
      <Header variant={headerVariant} />
      <div className="relative min-h-screen">
        <BackgroundMain>{children}</BackgroundMain>
      </div>
      <Footer variant={headerVariant} />
    </div>
  );
}
