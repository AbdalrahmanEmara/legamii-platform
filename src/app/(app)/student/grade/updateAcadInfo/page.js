import FormInput from "@/components/auth/FormInput";
import ReusableWindow from "@/components/ui/ReusableWindow";

export default function GradePage() {
    return (
        <ReusableWindow title="Update Academic Info" className="m-auto flex w-2xl overflow-hidden max-w-full flex-col">
            <h1>
                Enter your grade
            </h1>
            <form>
                <FormInput />
            </form>
        </ReusableWindow>
    )
}
