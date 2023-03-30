import * as React from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";

export default function ConfirmDialog({ onConfirmDialogClose, onYesClick, title }) {
  console.log("ra");
  return (
    <>
      <Dialog
        className="confirm-dialog"
        open={true}
        onClose={onConfirmDialogClose}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#FF9E43" }}
            onClick={onConfirmDialogClose}
          >
            Hủy
          </Button>
          <Button
            onClick={onYesClick}
            variant="contained"
            sx={{ mb: 2, background: "#7467EF" }}
            type="submit"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
