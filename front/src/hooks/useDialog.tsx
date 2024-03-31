"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { FC, useState } from "react";

type DialogProps = {
  open: boolean;
  onClose: (result: boolean) => void;
  title: string;
  message: JSX.Element | string;
  trueVal: string;
  falseVal: string;
};

const _ModalDialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  message,
  trueVal,
  falseVal,
}) => {
  return (
    <AlertDialog open={open} aria-labelledby="responsive-dialog-title">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
          <AlertDialogAction autoFocus onClick={() => onClose(true)}>
            {trueVal}
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => onClose(false)}
            className="text-red-500 bg-red-200 hover:bg-red-100"
          >
            {falseVal}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [resolve, setResolve] = useState<(result: boolean) => void>(
    () => () => {},
  );

  const openDialog = () => {
    setIsDialogOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolve(() => resolve);
    });
  };

  const onClose = (result: boolean) => {
    setIsDialogOpen(false);
    if (resolve) {
      resolve(result);
    }
  };

  const ModalDialog: FC<{
    title: string;
    message: JSX.Element | string;
    trueVal: string;
    falseVal: string;
  }> = ({ title, message, trueVal, falseVal }) => (
    <_ModalDialog
      open={isDialogOpen}
      onClose={onClose}
      title={title}
      message={message}
      trueVal={trueVal}
      falseVal={falseVal}
    />
  );

  return {
    ModalDialog,
    openDialog,
  };
};
