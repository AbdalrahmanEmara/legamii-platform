import { Suspense } from "react";
import CreateNewPassForm from "@/components/auth/CreateNewPassForm";

export default function NewPassPage() {
  return (
    <div className="p-xl gap-base flex flex-col">
      <p className="text-text font-primary text-2xl leading-8 font-bold uppercase">
        create new password
      </p>

      <Suspense fallback={null}>
        <CreateNewPassForm />
      </Suspense>
    </div>
  );
}
