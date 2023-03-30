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
import "react-toastify/dist/ReactToastify.css";
function RefuseDialog(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.Employee.employeeData);
  const { handleClose, handleCloseAll } = props;
  const formik = useFormik({
    initialValues: {
      content: "",
      date: "",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Vui lòng nhập ngày"),
      content: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      if (employee.promoteRequest) {
        employee.status = "Đã duyệt";

        employee.listPromote.forEach((promote) => {
          if (promote.id === employee.promoteRequest.id) {
            promote.status = "Từ chối"
            promote.refuseInfo = values;
            promote.additionalRequest = null;
          }
        })

        employee.promoteRequest = null
        employee.refuseInfo = null
        
      } else if (employee.proposeRequest) {
        employee.status = "Đã duyệt";

        employee.listPropose.forEach((propose) => {
          if (propose.id === employee.proposeRequest.id) {
            propose.status = "Từ chối"
            propose.refuseInfo = values;
            propose.additionalRequest = null;
            // propose.refuseInfo = values;

            // propose.status = "Từ chối"
          }
        })

        employee.proposeRequest = null
        employee.refuseInfo = null

      } else if (employee.increaseRequest) {

        employee.status = "Đã duyệt";
        employee.listIncreaseSalary.forEach((item) => {
          if (item.id === employee.increaseRequest.id) {
            item.refuseInfo = values;
            item.additionInfo = null
            item.status = "Từ chối"
            // delete item.additionalRequest
          }
        })
        employee.increaseRequest = null
        employee.refuseInfo = null
        
      } else {
        employee.status = "Từ chối";
        employee.refuseInfo = values;
        
      }
      employee.additionalRequest = null;
      // employee.status = "Từ chối";
      dispatch(updateEmployee(employee));
      handleCloseAll();
      toast.success("Từ chối thành công");
    },
  });
  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Từ chối phê duyệt
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Thời gian"
                  variant="outlined"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  error={formik.errors.date && formik.touched.date}
                  helperText={formik.errors.date}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  minRows={5}
                  multiline
                  name="content"
                  label="Lý do "
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  error={formik.errors.content && formik.touched.content}
                  helperText={formik.errors.content}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} type="submit">
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RefuseDialog;
