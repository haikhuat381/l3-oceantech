import React from "react";
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
  IconButton,
  Icon,
  Typography,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";

function ReleaseDialog(props) {
  const { handleClose, handleCloseAll, display } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  var today = new Date();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      reason: employeeData.releaseRequest?.reason || "",
      date: employeeData.releaseRequest?.date || "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      employeeData.releaseRequest = values;
      employeeData.status = "Chờ duyệt";
      dispatch(updateEmployee(employeeData));
      handleCloseAll();
      toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
        >
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid
              container
              spacing={2}
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                padding: 15,
              }}
            >
              <Grid container>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h5" textTransform="uppercase">
                    Cộng hòa xã hội Việt Nam
                  </Typography>
                </Grid>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h6">Độc lập - Tự do - Hạnh phúc</Typography>
                </Grid>
                <Grid container item sm={12} xs={12} justifyContent="center">
                  <Typography>-------------------------------------</Typography>
                </Grid>
                <Grid sx={{ pt: 8, pb: 8 }} container item sm={12} xs={12} justifyContent="center">
                  <Typography variant="h5">ĐƠN XIN NGHỈ VIỆC</Typography>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  className=" container-form"
                  sx={{ pl: 10, pr: 10, pb: 2 }}
                >
                  <Grid item sm={12} xs={12}>
                    <Typography>Kính gửi: Ban giám đốc công ty OceanTech</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  sx={{ pl: 10, pr: 10, pb: 2 }}
                  justifyContent="flex-start"
                >
                  <Grid item sm={1.5} xs={1.5}>
                    <Typography>Tôi tên là:</Typography>
                  </Grid>
                  <Grid item sm={10.5} xs={10.5}>
                    <TextField
                      fullWidth
                      value={employeeData.fullName}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  sx={{ pl: 10, pr: 10, pb: 2 }}
                  justifyContent="flex-start"
                >
                  <Grid item sm={3.5} xs={3.5}>
                    <Typography>Hiện đang công tác tại vị trí:</Typography>
                  </Grid>
                  <Grid item sm={8.5} xs={8.5}>
                    <TextField
                      fullWidth
                      value={employeeData.position}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  sx={{ pl: 10, pr: 10, mt: 1 }}
                  justifyContent="flex-start"
                >
                  <Grid item sm={4} xs={4}>
                    <Typography>Tôi xin được phép nghỉ làm từ ngày:</Typography>
                  </Grid>
                  <Grid item sm={8} xs={8}>
                    <TextField
                      type="date"
                      fullWidth
                      variant="standard"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      error={formik.errors.date && formik.touched.date}
                      helperText={formik.errors.date}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  sx={{ pl: 10, pr: 10, pb: 2, mt: 2 }}
                  justifyContent="flex-start"
                >
                  <Grid item container sm={12} xs={12} spacing={2}>
                    <Grid item container>
                      <Grid item xs={12}>
                        <Typography>
                          Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc vì lí do:
                        </Typography>
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          fullWidth
                          multiline
                          variant="standard"
                          name="reason"
                          value={formik.values.reason}
                          onChange={formik.handleChange}
                          error={formik.errors.reason && formik.touched.reason}
                          helperText={formik.errors.reason}
                        />
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Typography lineHeight={2}>
                        Trong khi chờ đợi sự chấp thuật của Ban Giám đốc Công ty, tôi sẽ tiếp tục
                        làm việc nghiêm túc và tiến hành bàn giao công việc cũng như tài sản cho
                        người quản lý trực tiếp của tôi.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} xs={12} sx={{ mt: 1 }}>
                    <Typography>Tôi xin chân thành cảm ơn.</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  xs={12}
                  sx={{ pl: 10, pr: 10, mt: 1 }}
                  justifyContent="flex-end"
                ></Grid>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                sx={{ pl: 10, pr: 10 }}
                justifyContent="flex-end"
              >
                <Grid
                  item
                  sm={4}
                  xs={4}
                  container
                  direction="column"
                  textAlign="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>{`Hà Nội, ${today.toLocaleDateString(
                      "vi-VN",
                      options
                    )}`}</Typography>
                    {/* <Typography>{`Hà Nội, ngay ${today.getDate()} thang ${today.getMonth() + 1} nam ${today.getFullYear()}`}</Typography> */}
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: "bold" }}>Người làm đơn</Typography>
                  </Grid>
                  <Grid item>
                    {" "}
                    <Typography style={{ fontWeight: "bold" }}>
                      {employeeData.fullName.split(" ").pop()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: "bold" }}>{employeeData.fullName}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                sx={{ pl: 10, pr: 10, mt: 3 }}
                justifyContent="flex-end"
              >
                <Grid item sm={3} xs={3}>
                  <Typography
                    className="font-15"
                    style={{ fontWeight: "bold", textDecoration: "uppercase" }}
                  ></Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="button-cancel"
              variant="contained"
              sx={{ mb: 2, background: "#FF9E43" }}
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              className="button-confirm1"
              variant="contained"
              type="submit"
              sx={{ mb: 2 }}
              color="primary"
            >
              Trình lãnh đạo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default ReleaseDialog;
