import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  InputAdornment,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
function SaveProfileInfo(props) {
  const { handleClose, openEditDialog } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  console.log(employeeData);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Thông tin nộp lưu
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <Typography>
              Ngày Lưu: {employeeData.saveProfileInfo.date.split("-").reverse().join("-")}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Số lưu: {employeeData.saveProfileInfo.numberSave} </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveProfileInfo;
