"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose(true)}>
          {trueVal}
        </Button>
        <Button onClick={() => onClose(false)}>{falseVal}</Button>
      </DialogActions>
    </Dialog>
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
