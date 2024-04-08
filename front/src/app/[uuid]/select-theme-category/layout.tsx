import styles from "@/app/[uuid]/select-theme-category/SelectThemeCategory.module.scss"; // prettier-ignore

export default function layout({ children }: { children: React.ReactNode }) {
  return <main className={styles.wrapper}>{children}</main>;
}
