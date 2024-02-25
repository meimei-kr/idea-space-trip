import { HomePresentation } from "@/app/presentation/Home/HomePresentation";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

export async function HomeContainer() {
  const session = await getServerSession(authOptions);

  return <HomePresentation session={session} />;
}

export default HomeContainer;
