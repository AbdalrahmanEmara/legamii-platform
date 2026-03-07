import FormInput from "../auth/FormInput";
import Btn1 from "../ui/Btn1";
import ReusableWindow from "../ui/ReusableWindow";

export default function Welcome({ name }) {
  return (
    <div className="relative">
      <ReusableWindow title="welcome.sys" className="absolute top-0 left-0 h-64.5 w-full max-w-243">
        <div className="h-39.5" />
      </ReusableWindow>
      <ReusableWindow title="welcome.sys" className="relative top-6.25 left-4.5 w-full max-w-243">
        <div className="p-base gap-sm flex flex-col">
          <p className="text-text font-primary text-3xl font-bold uppercase">
            welcome back, {name}!
          </p>
          <div className="gap-base px-sm flex flex-col">
            <p className="text-text font-secondary text-xl leading-7 font-normal">
              Ready to join your class?
            </p>
            <form className="gap-md flex">
              <FormInput
                id={"class-code"}
                className={"flex-1"}
                placeholder="Enter your class code"
              />
              <Btn1 title={"join"} className={"h-13.5"} disabled={true} />
            </form>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}
