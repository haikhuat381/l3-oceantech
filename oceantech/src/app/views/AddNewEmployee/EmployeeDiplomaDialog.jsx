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
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { v4 as uuidv4 } from "uuid";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewEmployee, getEmployeeData, updateEmployee } from "app/redux/actions/actions";
function EmployeeDiplomaDialog(props) {
  const { diplomaData, handleAddDiploma, employeeData } = props;

  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: diplomaData?.name || "",
      content: diplomaData?.content || "",
      date: diplomaData?.date || "",
      field: diplomaData?.field || null,
      place: diplomaData?.place || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Hãy nhập đầy tên van bằng")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      content: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung bằng")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      place: Yup.string()
        .min(5, "Hãy nhập Nơi cấp")
        .max(30, "Nhập nơi cấp đúng định dạng")
        .required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
      field: Yup.object().required("Hãy nhập lĩnh vực").nullable(),
    }),
    onSubmit: (values) => {
      console.log(employeeData.listDiploma)

      if (Object.keys(diplomaData).length === 0) {
        values.id = uuidv4();
        handleAddDiploma(values, "listDiploma");
      } else {
        values.id = diplomaData.id;
        employeeData.listDiploma = employeeData.listDiploma.filter((diploma) => diploma.id !== values.id);
        employeeData.listDiploma.push(values);
      }
      handleClose();
    },
  });
  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Thêm văn bằng
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <TextField
                label="Tên văn bằng"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name && formik.touched.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                label="Nội dung văn bằng"
                type="text"
                fullWidth
                variant="outlined"
                name="content"
                size="small"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.errors.content && formik.touched.content}
                helperText={formik.errors.content}
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextField
                label="Nơi cấp"
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                name="place"
                value={formik.values.place}
                onChange={formik.handleChange}
                error={formik.errors.place && formik.touched.place}
                helperText={formik.errors.place}
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Ngày cấp"
                variant="outlined"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                helperText={formik.errors.date}
              />
            </Grid>
            <Grid item sm={4} xs={4}>
              <TextField
                select
                label="Lĩnh vực"
                type="text"
                fullWidth
                variant="outlined"
                name="field"
                size="small"
                value={formik.values?.field?.fieldName}
                onChange={(event) => {
                  formik.setFieldValue("field", { fieldName: event.target.value });
                }}
                error={formik.errors.field && formik.touched.field}
                helperText={formik.errors.field}
              >
                {otherFeature.DegreeField.map((item) => (
                  <MenuItem value={item.fieldName}>{item.fieldName}</MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                size="small"
                fullWidth
                disablePortal
                value={formik.values?.field || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("field", newValue);
                }}
                options={otherFeature.DegreeField}
                getOptionLabel={(option) => option.fieldName}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Lĩnh vực"
                    error={formik.errors.field && formik.touched.field}
                    helperText={formik.errors.field}
                  />
                )}
              /> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="submit" onClick={formik.handleSubmit}>
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EmployeeDiplomaDialog;
