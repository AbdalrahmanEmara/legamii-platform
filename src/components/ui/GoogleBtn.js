import GoogleIcon from "../icons/GoogleIcon";

export default function GoogleBtn() {
  return (
    <button className="text-text font-montserrat bg-sec-el px-md py-sm flex cursor-pointer items-center justify-center gap-4 rounded text-lg font-bold capitalize hover:bg-neutral-200">
      <GoogleIcon size={23} />
      <span>Google</span>
    </button>
  );
}
