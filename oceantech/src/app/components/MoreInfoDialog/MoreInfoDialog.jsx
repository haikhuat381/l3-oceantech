import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close, UndoRounded } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
function MoreInfoDialog(props) {
  const { handleClose, openEditDialog, display, title, rowDataInfo, handleEditPromote } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);

  console.log("haikhuat");
  console.log(employeeData);
  console.log("rowDataInfo",rowDataInfo);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {rowDataInfo === undefined ? (employeeData.refuseInfo ? "Từ chối" : "Yêu cầu bổ sung") : 
          ( rowDataInfo?.status) }
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 10 }}>
        <Typography>
          {rowDataInfo === undefined ? (employeeData.refuseInfo ? "Lý do:" : "") :  ( rowDataInfo?.status === "Từ chối" ? "Lý do:" : "") }{" "}
          { rowDataInfo?.content || employeeData.refuseInfo?.content || employeeData.additionalRequest?.content}
        </Typography>
        <Typography></Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2, display:rowDataInfo === undefined ? (employeeData.refuseInfo ? "none" : "") :  ( rowDataInfo?.status === "Từ chối" ? "none" : "") }}
          onClick={openEditDialog}
          // onClick={rowDataInfo !== undefined ? handleEditPromote() : openEditDialog }
        >
          Bổ sung thông tin
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MoreInfoDialog;
