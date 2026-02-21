import ArrowIcon from "../icons/ArrowIcon";
import FormInput from "./FormInput";
export default function SignupContent() {
  return (
    <div className="gap-md px-xl py-lg bg-el-bg flex flex-col rounded-b-lg">
      <header className="flex flex-col gap-2">
        <p className="text-text font-primary text-4xl leading-[48px] font-bold uppercase">
          Ready to level up your learning?
        </p>
        <p className="text-sec-text font-secondary text-lg leading-6 font-normal">
          Join the game of learning - Level up your skills, win contests, grow smarter everyday
        </p>
      </header>

      <form className="gap-base flex flex-col">
        <FormInput type="email" placeholder="Enter your email" label="email" id="email" />
        <FormInput type="password" placeholder="Your password" label="password" id="password" />
        <div className="gap-xs2 flex flex-col">
          <label
            htmlFor="grades"
            className="text-text font-primary text-sm leading-5 font-normal uppercase"
          >
            Grade
          </label>
          <select
            name="grades"
            id="grades"
            className="text-sec-text font-secondary rounded border border-neutral-400 p-4 text-sm leading-5 font-normal"
          >
            <option>Grade 4</option>
          </select>
        </div>
      </form>
    </div>
  );
}
