"use client";

import Button from "@/components/elements/Button/Button";
import styles from "@/features/check-theme/components/Buttons/Buttons.module.scss";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { updateIdeaSession } from "@/lib/idea-sessions";
import { IdeaSessionType } from "@/types";
import { useRouter } from "next/navigation";

export default function Buttons({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const router = useRouter();
  const { uuid } = useUUIDCheck({ ideaSession });

  const handleYesClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: true,
    });
    router.push(`/${uuid}/input-theme`);
  };

  const handleNoClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: false,
    });
    router.push(`/${uuid}/select-theme-category`);
  };

  return (
    <div className={styles.buttons}>
      <Button onClick={handleYesClick} color="pink" size="large">
        <div>YES</div>
      </Button>
      <Button onClick={handleNoClick} color="light-blue" size="large">
        <div>NO</div>
      </Button>
    </div>
  );
}
