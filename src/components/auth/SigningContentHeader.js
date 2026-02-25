export default function SigningContentHeader({ header, word }) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-text font-primary text-3xl leading-9 font-bold uppercase">{header}</p>
      <p className="text-sec-text font-secondary text-lg leading-6 font-normal">{word}</p>
    </header>
  );
}
