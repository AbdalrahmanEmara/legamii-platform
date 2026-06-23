import { getContests } from "@/lib/services/student_contest.service";
import ContestList from "./ContestList";

export default async function ContestListWrapper({ searchParams }) {
  const resolvedParams = await searchParams;
  const status = resolvedParams?.status || "UPCOMING";

  try {
    const contestsData = await getContests(null, status);
    return <ContestList contestsData={contestsData?.data || []} className="p-base" />;
  } catch (error) {
    console.error("Failed to load contests:", error);
    return <ContestList contestsData={[]} className="p-base" />;
  }
}