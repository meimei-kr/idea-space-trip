import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

export default function AlertDialogOnDelete({
  isOpen,
  onClickCancel,
  onClickOk,
  disabled,
  dialogTitle,
  dialogDescription,
}: {
  isOpen: boolean;
  onClickCancel: () => void;
  onClickOk: () => void;
  disabled: boolean;
  dialogTitle: string;
  dialogDescription: React.ReactNode;
}) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-950">
            {dialogTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-gap">
          <AlertDialogCancel className="text-slate-950" onClick={onClickCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClickOk}
            disabled={disabled}
            className="text-red-500 bg-red-200 hover:bg-red-100"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
