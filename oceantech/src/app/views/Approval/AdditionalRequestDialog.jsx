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
function AdditionalRequestDialog(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.Employee.employeeData);
  const { handleClose, handleCloseAll } = props;
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
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
            promote.status = "Yêu cầu bổ sung"
            promote.additionalRequest = values;
            promote.refuseInfo = null;
          }
        })
        
        employee.promoteRequest = null
        employee.additionalRequest = null;

      } else if (employee.proposeRequest) {
        employee.status = "Đã duyệt";

        employee.listPropose.forEach((propose) => {
          if (propose.id === employee.proposeRequest.id) {
            propose.status = "Yêu cầu bổ sung"
            propose.additionalRequest = values;
            propose.refuseInfo = null;

            // propose.status = "Từ chối"
          }
        })

        employee.proposeRequest = null
        employee.additionalRequest = null;

      } else if (employee.increaseRequest) {
        
        employee.status = "Đã duyệt";
        employee.listIncreaseSalary.forEach((item) => {
          if (item.id === employee.increaseRequest.id) {
            item.additionInfo = values;
            item.status = "Yêu cầu bổ sung"
            item.refuseInfo = null

          }
        })
        employee.increaseRequest = null
        employee.additionalRequest = null
      } else {
        employee.status = "Yêu cầu bổ sung";
        employee.additionalRequest = values;
        
        
      }
      employee.refuseInfo = null;


      // employee.status = "Yêu cầu bổ sung";
      // employee.additionalRequest = values;
      dispatch(updateEmployee(employee));
      handleCloseAll();
      toast.success("Gửi yêu cầu bổ sung thành công");
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Yêu cầu bổ sung
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 10 }}>
            <TextField
              fullWidth
              minRows={5}
              multiline
              name="content"
              label="Yêu cầu bổ sung"
              onChange={formik.handleChange}
              value={formik.values.content}
              error={formik.errors.content && formik.touched.content}
              helperText={formik.errors.content}
            />
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

export default AdditionalRequestDialog;
