import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { endSession } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function EndSessionForm({ uuid }: { uuid: string }) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        await endSession(uuid);
        router.push(`/${uuid}/end-session`);
        router.refresh();
      }}
    >
      <EndSessionButton />
    </form>
  );
}

const EndSessionButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBordersLg type="submit" disabled={pending}>
      セッションを終了する
    </LitUpBordersLg>
  );
};
