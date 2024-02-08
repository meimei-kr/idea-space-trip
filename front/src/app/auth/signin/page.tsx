import GoogleSignInButton from "@/app/components/GoogleSignInButton/GoogleSignInButton";
import { authOptions } from "@/app/lib/options";
import { getServerSession } from "next-auth";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
