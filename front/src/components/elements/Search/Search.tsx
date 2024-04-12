"use client";

import styles from "@/components/elements/Search/Search.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.label}>
        Search
      </label>
      <input
        className={styles.input}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <HiOutlineMagnifyingGlass className={styles.icon} />
    </div>
  );
}
