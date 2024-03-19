"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
// IdeaMemoModal.tsx

export default function Modal({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={() => router.push("/idea-memos")}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent className="text-white bg-slate-950 max-h-[90%] overflow-y-scroll">
        {children}
      </DialogContent>
    </Dialog>
  );
}
