import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import ReactToPrint from "react-to-print";
function ConfirmPrintDialog(props) {
  const { handleClose, componentRef } = props;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        In biểu mẩu
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 10 }}></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
          Hủy
        </Button>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }}>
              Xác nhận
            </Button>
          )}
          onAfterPrint={handleClose}
          content={() => componentRef.current}
        />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPrintDialog;
