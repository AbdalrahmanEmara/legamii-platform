import BackgroundV2 from "@/components/ui/BackgroundV2";

export default function AuthLayout({ children }) {
  return (
    <BackgroundV2>
      <div className="md:px-xl3 px-base py-xl gap-xl6 z-10 flex">{children}</div>
    </BackgroundV2>
  );
}
