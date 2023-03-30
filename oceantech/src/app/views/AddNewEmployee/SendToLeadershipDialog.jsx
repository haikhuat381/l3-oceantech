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
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateEmployee } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
function SendToLeadershipDialog(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.Employee.employeeData);
  const { handleClose, handleCloseAll } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      position: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Hãy nhập đầy tên nhân viên")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      content: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
      position: Yup.string().required("Nhập vị trí"),
    }),
    onSubmit: (values) => {
      employee.sendLeader = values;
      employee.status = "Chờ duyệt";
      dispatch(updateEmployee(employee));

      handleCloseAll();
      toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Gửi lãnh đạo
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="name"
                  label="Tên nhân viên"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name && formik.touched.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="date"
                  label="Ngày gửi"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  error={formik.errors.date && formik.touched.date}
                  helperText={formik.errors.date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Chức Vụ"
                  name="position"
                  onChange={formik.handleChange}
                  value={formik.values.position}
                  error={formik.errors.position && formik.touched.position}
                  helperText={formik.errors.position}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <TextField
                fullWidth
                label="Nội dung"
                name="content"
                multiline
                minRows={3}
                onChange={formik.handleChange}
                value={formik.values.content}
                error={formik.errors.content && formik.touched.content}
                helperText={formik.errors.content}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SendToLeadershipDialog;
