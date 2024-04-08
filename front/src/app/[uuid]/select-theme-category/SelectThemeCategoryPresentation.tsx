"use client";

import styles from "@/app/[uuid]/select-theme-category/SelectThemeCategory.module.scss"; // prettier-ignore
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import SelectForm from "@/features/select-theme/components/SelectForm/SelectForm";

export default function SelectThemePresentation({ uuid }: { uuid: string }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>どの発明家になってみる？</Description>
          <SelectForm uuid={uuid} />
        </div>
      </div>
      <BackButton path={`/${uuid}/check-theme`} />
    </>
  );
}
