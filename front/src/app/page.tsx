import { HomePresentation } from "@/app/HomePresentation";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <HomePresentation session={session} />;
}
