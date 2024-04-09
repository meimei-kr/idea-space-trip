"use client";

import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    router.prefetch("/");
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center relative z-10">
      <h2 className="text-center">内部エラーが発生しました。</h2>
      <div className="flex justify-center items-center gap-6">
        <button
          className="mt-4 rounded-md bg-white px-4 py-2 text-sm text-slate-900 transition-colors hover:bg-slate-200"
          onClick={() => router.push("/")}
        >
          トップ
        </button>
        <button
          className="mt-4 rounded-md bg-white px-4 py-2 text-sm text-slate-900 transition-colors hover:bg-slate-200"
          onClick={() => reset()}
        >
          再試行
        </button>
      </div>
    </main>
  );
}
