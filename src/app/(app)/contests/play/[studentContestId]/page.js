import ContestPlayPage from "./ContestPlayPage";

export default async function Page({ params }) {
  // Normally we would await params and fetch contest details here
  // const { studentContestId } = await params;
  
  // Since we are using fake data as requested, we just render the client component.
  const resolvedParams = await params;
  return (
    <div className="w-full flex h-full items-center justify-center p-8 bg-transparent">
      <ContestPlayPage studentContestId={resolvedParams.studentContestId} />
    </div>
  );
}
