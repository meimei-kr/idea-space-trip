import { getUser } from "@/lib/user";
import MyPagePresentation from "./MyPagePresentation";

export default async function MyPage() {
  const user = await getUser();

  return <MyPagePresentation user={user} />;
}
