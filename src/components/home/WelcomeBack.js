import FormInput from "../auth/FormInput";
import Btn1 from "../ui/Btn1";
import ReusableWindow from "../ui/ReusableWindow";

export default function WelcomeBack() {
  return (
    <div className="relative w-full">

      <ReusableWindow title="welcome.sys" className="relative top-3 left-3 w-[calc(100%-1rem)] h-[calc(100%-1rem)] z-10">
        <div className="flex flex-col gap-base p-sm md:p-base">
          <h4 className="font-primary text-text text-xl font-bold uppercase leading-6 md:text-2xl md:leading-8 2xl:text-3xl 2xl:leading-9">
            Welcome back, rana!
          </h4>
          <div className="flex flex-col gap-base">
            <p className="font-secondary text-text text-sm leading-5 md:text-lg md:leading-6 2xl:text-xl 2xl:leading-7">
              Ready to join your class?
            </p>
            <form className="flex items-center gap-sm">
              <FormInput
                id="classCode"
                placeholder="Enter your class code"
                className="flex-1"
                InputClassName="text-xs leading-4 p-sm 2xl:text-sm 2xl:leading-5"
              />
              <Btn1 title="Join" size="text-xs leading-4 px-base py-sm md:text-sm md:leading-5 md:px-md 2xl:text-base font-bold" />
            </form>
          </div>
        </div>
      </ReusableWindow>
      <ReusableWindow title="welcome.sys" className="absolute top-0 left-0 w-[calc(100%-1rem)] h-[calc(100%-1rem)]">

      </ReusableWindow>

    </div>
  );
}
