import ContentBox from "../components/ui/ContentBox";

export default function Home() {
  return (
    <div className="bg-background flex flex-wrap items-center justify-center gap-8 p-8">
      <ContentBox width={340} height={300}>
        <h2 className="mb-4 text-xl font-bold">Mathematics</h2>
        <p className="text-muted-foreground">Your content goes here</p>
      </ContentBox>

      <ContentBox width={400}>
        <h2 className="mb-4 text-xl font-bold">History</h2>
        <p className="text-muted-foreground">Auto height based on content</p>
      </ContentBox>
    </div>
  );
}

{
  /* <div>Legamii Landing page</div>; */
}
