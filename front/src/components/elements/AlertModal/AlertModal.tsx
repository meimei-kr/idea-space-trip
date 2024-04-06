"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

export default function AlertModal({
  isOpen,
  onClick,
  actionDisplay,
  children,
}: {
  isOpen: boolean;
  onClick: () => void;
  actionDisplay: string;
  children: React.ReactNode;
}) {
  return (
    <AlertDialog open={isOpen} aria-labelledby="responsive-dialog-title">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-left">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
          <AlertDialogAction onClick={onClick}>
            {actionDisplay}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
