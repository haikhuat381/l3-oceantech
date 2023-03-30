import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Card,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Icon,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import CustomAvatar from "app/components/Avatar/Avatar";
import ReleaseDialog from "./ReleaseDialog";
import UpdateOptions from "./UpdateOptions";
import { useSelector, useDispatch } from "react-redux";

function ManagerEmployeeDialog({ handleClose }) {
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  return (
    <>
      {" "}
      <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Cập nhật diễn biến
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container xs={12} spacing={4}>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={12}>
                <CustomAvatar image={employeeData.image} displayButton="none" />
                <Typography variant="h5" textAlign={"center"} textTransform={"uppercase"}>
                  {employeeData.fullName}
                </Typography>
                <Typography variant="subtitle1" textAlign={"center"}>
                  {employeeData.team}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={8} spacing={2}>
              <Card>
                <CardHeader title="Thông tin cơ bản " />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Họ và tên"
                        variant="outlined"
                        value={employeeData.fullName}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Mã nhân viên"
                        variant="outlined"
                        value={employeeData.code}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Email"
                        variant="outlined"
                        value={employeeData.email}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Số điện thoại"
                        variant="outlined"
                        value={employeeData.phone}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        type={"date"}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Ngày sinh"
                        variant="outlined"
                        value={employeeData.birthday}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Vị trí"
                        value={employeeData.position}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                ></Box>
              </Card>
            </Grid>
            <Grid item container xs={12}>
              <UpdateOptions />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#d32f2f" }}
            onClick={() => setShouldOpenDialog(true)}
          >
            Kết thúc
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <ReleaseDialog
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
        />
      )}
    </>
  );
}

export default ManagerEmployeeDialog;
