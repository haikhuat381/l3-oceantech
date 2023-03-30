import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import { updateEmployee, getEmployeeData } from "app/redux/actions/actions";
import EmployeeDiplomaDialog from "./EmployeeDiplomaDialog";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import {
  Button, Box, Icon, IconButton, styled, Tooltip,

  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,

} from "@mui/material";


import { v4 as uuidv4 } from "uuid";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";




function EmployeeDiploma(props) {


  const { employeeData, handleAddDiploma } = props;
  // console.log("bb", employeeData);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [diplomaData, setDiplomaData] = useState({});
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] =
    useState(false);
  // const test = useRef(employeeData)
  // const [test,setTest] = useState(employeeData)
  // useEffect(()=> {
  //   setTest(employeeData)
  // },[employeeData])
  const handleClose = () => {
    // setShouldOpenDialog(false);
    setDiplomaData({});
  };
  const handleChangeEmployee = (rowdata, method) => {
    if (method == 1) {
      // setShouldOpenDialog(true);
      // setDiplomaData(rowdata);
      formik.setValues(rowdata);
    }
    if (method == 0) {
      setDiplomaData(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };
  const handleDeleteDiploma = () => {
    employeeData.listDiploma = employeeData.listDiploma.filter(
      (diploma) => diploma.id !== diplomaData.id
    );
    setshouldOpenConfirmationDeleteDialog(false);
    setDiplomaData({});
  };
  const formik = useFormik({

    initialValues: {
      // name: diplomaData?.name || "",
      // content: diplomaData?.content || "",
      // date: diplomaData?.date || "",
      // field: diplomaData?.field || null,
      // place: diplomaData?.place || "",
      name: "",
      content: "",
      date: "",
      field: null,
      place: "",
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
    onSubmit: (values, { resetForm }) => {
      console.log("haikhuat")
      console.log(values)
      console.log(employeeData)
      // if (Object.keys(diplomaData).length === 0) {
      if (!values.id) {
        console.log("tao")
        values.id = uuidv4();
        handleAddDiploma(values, "listDiploma");
      } else {
        console.log("sua")
        employeeData.listDiploma = employeeData.listDiploma.filter((diploma) => diploma.id !== values.id);
        console.log(employeeData.listDiploma)
        employeeData.listDiploma.push(values);
      }
      resetForm();
      handleClose();
    },
  });
  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);

  console.log(employeeData)

  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 0)}>
                <Icon color={"error"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Tên văn bằng", field: "name" },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "place" },
    { title: "Ngày cấp", field: "date" },
    { title: "Lĩnh Vực", render: (rowData) => rowData.field.fieldName },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setDiplomaData({});
          }}
          onYesClick={() => {
            handleDeleteDiploma();
          }}
          title="Xóa văn bằng"
        />
      )}

      <form>
        {/* <Grid style={{ padding: "10px 0px 0px 0px" }}> */}
        <Grid container spacing={2} style={{ paddingBottom: "20px" }}>
          <Grid item sm={4} xs={12}>
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
          <Grid item sm={4} xs={12}>
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
          <Grid item sm={4} xs={12}>
            <TextField
              select
              label="Lĩnh vực"
              type="text"
              fullWidth
              variant="outlined"
              name="field"
              size="small"
              value={formik.values?.field?.fieldName || ""}
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
          <Grid item sm={4} xs={12}>
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
          <Grid item sm={4} xs={12}>
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
          <Grid container item xs={3} spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ background: "#FF9E43" }} onClick={formik.resetForm}>
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ background: "#7467EF" }} type="button" onClick={formik.handleSubmit}>
                Lưu
              </Button>
            </Grid>
          </Grid>

        </Grid>
        {/* </Grid> */}
        {/* <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={formik.resetForm}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="submit" onClick={(e) => { e.preventDefault(); formik.handleSubmit }}>
            Xác nhận
          </Button>
        </DialogActions> */}
      </form>

      {/* <Box className="box" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm mới
        </Button>
      </Box> */}
      <MaterialTable
        title={""}
        data={employeeData?.listDiploma}
        columns={columns}
        options={{
          rowStyle: (rowData, index) => {
            return {
              backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
            };
          },
          maxBodyHeight: "1000px",
          minBodyHeight: "370px",
          headerStyle: {
            backgroundColor: "#262e49",
            color: "#fff",
          },

          // padding: 'dense',
          padding: "default",
          // search: false,
          // exportButton: true,
          toolbar: false,
        }}
      />

      {/* {shouldOpenDialog && (
        <EmployeeDiplomaDialog
          open={open}
          handleClose={handleClose}
          // employee={employeeData}
          // diplomaData={diplomaData}
          // handleAddDiploma={handleAddDiploma}
          employeeData={employeeData}
          diplomaData={diplomaData}
          handleAddDiploma={handleAddDiploma}
        />
      )} */}
    </>
  );
}

export default EmployeeDiploma;
