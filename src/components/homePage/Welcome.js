import FormInput from "../auth/FormInput";
import Btn1 from "../ui/Btn1";
import ReusableWindow from "../ui/ReusableWindow";

export default function Welcome({ name }) {
  return (
    <div className="relative">
      <ReusableWindow title="welcome.sys" className="absolute top-0 left-0 max-w-243 w-full h-64.5">
        <div className="h-39.5" />
      </ReusableWindow>
      <ReusableWindow title="welcome.sys" className="absolute top-6.25 left-4.5 max-w-243 w-full">
        <div className="p-base flex flex-col gap-sm">
          <p className="text-text text-3xl font-bold font-primary uppercase">
            welcome back, {name}!
          </p>
          <div className="flex flex-col gap-base px-sm">
            <p className="text-text text-xl font-normal font-secondary leading-7">Ready to join your class?</p>
            <form className="flex gap-md">
              <FormInput title="" className={"flex-1"} />
              <Btn1 title={"join"} className={"h-13.5"} />
            </form>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}