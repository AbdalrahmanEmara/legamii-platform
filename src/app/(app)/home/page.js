import Welcome from "@/components/homePage/Welcome";

export default function PracticePage() {
  const user = {
    name: "Ali",
  }

  return (
    <div>
      <Welcome name={user.name} />
    </div>
  );
}
