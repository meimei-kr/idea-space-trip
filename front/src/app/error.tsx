"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    router.prefetch("/");
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center relative z-10">
      <h2 className="text-center">
        内部エラーが発生しました。
        <br />
        お手数ですが、はじめからやり直してみてください。
      </h2>
      <button
        className="mt-4 rounded-md bg-white px-4 py-2 text-sm text-slate-900 transition-colors hover:bg-blue-400"
        onClick={() => router.push("/")}
      >
        Top
      </button>
    </main>
  );
}
