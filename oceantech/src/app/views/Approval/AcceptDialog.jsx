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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateEmployee } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AcceptDialog(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.Employee.employeeData);
  const { handleClose, handleCloseAll } = props;
  const formik = useFormik({
    initialValues: {
      date: "",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      console.log("haihai")
      console.log(values)
      console.log(employee)

      if (employee.releaseRequest) {
        employee.status = "Kết thúc";
      } else {
        employee.status = "Đã duyệt";

        if (employee.promoteRequest) {
          // employee.status = "Đã duyệt";
  
          employee.listPromote.forEach((promote) => {
            if (promote.id === employee.promoteRequest.id) {
              promote.status = "Đã duyệt"
            }
          })
  
          employee.promoteRequest = null
  
        }


        if (employee.proposeRequest) {
          // employee.status = "Đã duyệt";
  
          employee.listPropose.forEach((propose) => {
            if (propose.id === employee.proposeRequest.id) {
              propose.status = "Đã duyệt"
            }
          })
  
          employee.proposeRequest = null
        } 


        if(employee.increaseRequest) {
          
          employee.listIncreaseSalary.forEach((item)=>{
            if(item.id === employee.increaseRequest.id){
              item.status = "Đã duyệt"
            }
          })  
  
          employee.increaseRequest= null
        }

      }
      
      // else if (employee.promoteRequest) {
      //   employee.status = "Đã duyệt";

      //   employee.listPromote.forEach((promote) => {
      //     if (promote.id === employee.promoteRequest.id) {
      //       promote.status = "Đã duyệt"
      //     }
      //   })

      //   employee.promoteRequest = null

      // } else if (employee.proposeRequest) {
      //   employee.status = "Đã duyệt";

      //   employee.listPropose.forEach((propose) => {
      //     if (propose.id === employee.proposeRequest.id) {
      //       propose.status = "Đã duyệt"
      //     }
      //   })

      //   employee.proposeRequest = null
      // } 


      employee.acceptInfo = values;

      
      dispatch(updateEmployee(employee));
      toast.success("Phê duyệt thành công");
      handleCloseAll();
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Xác nhận phê duyệt
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày hẹn"
                  variant="outlined"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  error={formik.errors.date && formik.touched.date}
                  helperText={formik.errors.date}
                />
              </Grid>
              <Grid item xs={12}>
                {" "}
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Đã đủ điều kiện phê duyệt"
                />
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

export default AcceptDialog;
