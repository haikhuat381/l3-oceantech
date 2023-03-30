import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateEmployee, getEmployeeData } from "app/redux/actions/actions";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
// import RegisterDialog from './RegisterDialog'

function RegisterDocument(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.Employee.employeeData);
  const [employeeData, setEmployee] = useState(employee);
  const { handleClose } = props;
  const [listDocument, setListDocument] = useState([]);
  const [register, setRegister] = useState({})
  const [shouldOpenRegisterDialog, setShouldOpenRegisterDialog] = useState(false);
  const [shouldOpenConfirmationDeleteDialog, setShouldOpenConfirmationDeleteDialog] = useState(false)
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);



  // useEffect(()=>{
  //   console.log('EMPLOYEE DATA: ', employeeData.listRegister);
  //   console.log('LIST DOCUMENT: ', listDocument);
  // })
  // useEffect(() => {
  //   setListDocument(employeeData.listRegister)
  //   setEmployee(employee);
  //   console.log('Data lấy từ store:', employeeData);
  // }, [employee]);

  const formik = useFormik({
    initialValues: {
      content: "",
      document: "",
      note: "",
      date: "",
    }
    ,
    validationSchema: Yup.object({
      content: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      document: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      note: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(!values.id);

      if (!values.id) {
        values.id = uuidv4()
        setEmployee({ ...employeeData, "listRegister": [...employeeData?.listRegister, values] })
        const data = { ...employeeData, "listRegister": [...employeeData?.listRegister, values] }
        dispatch(updateEmployee(data))
        console.log('submit', employeeData);
        toast.success("Thêm thành công");

      }
      else {
        const newListFilter = employeeData.listRegister.filter((register) => register.id != values.id);
        employeeData.listRegister = newListFilter
        employeeData.listRegister.push(values)
        dispatch(updateEmployee(employeeData));
        console.log('submit update', employeeData);
        toast.success("Sửa thành công");
      }
      resetForm();
    },
  });

  const handleEditDocument = (rowData) => {
    formik.setValues(rowData);
  };
  const handleRemoveDocument = (rowData) => {
    console.log(employeeData);
    employeeData.listRegister = employeeData.listRegister.filter((item) => item.id !== register.id);
    setEmployee(employeeData)
    dispatch(updateEmployee(employeeData))
    setShouldOpenConfirmationDeleteDialog(false)
    toast.success("Xóa thành công");
  };
  const handleSave = () => {
    toast.success("Lưu thành công");
  };
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                disabled={rowData.additionalRequest || rowData.refuseInfo ? false : true}
                onClick={() => {
                  dispatch(getEmployeeData(rowData));
                  setShouldOpenRequestDialog(true);
                }}
              >
                <Icon
                  color={rowData.additionalRequest || rowData.refuseInfo ? "primary" : "disabled"}
                >
                  report
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                onClick={() => {
                  handleEditDocument(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  console.log('remove')
                  setShouldOpenConfirmationDeleteDialog(true)
                  setRegister(rowData)
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Hồ sơ", field: "document" },

    { title: "Nội dung", field: "content" },
    { title: "Ngày đăng kí", field: "date" },
    { title: "Ghi chú", field: "note" },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} pt={1}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Hồ sơ"
              fullWidth
              name="document"
              value={formik.values.document}
              onChange={formik.handleChange}
              error={formik.errors.document && formik.touched.document}
              helperText={formik.errors.document}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              size="small"
              label="Nội dung"
              fullWidth
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content && formik.touched.content}
              helperText={formik.errors.content}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={5}>
            <TextField
              size="small"
              label="Ngày đăng kí"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.errors.date && formik.touched.date}
              helperText={formik.errors.date}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Ghi chú"
              fullWidth
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              error={formik.errors.note && formik.touched.note}
              helperText={formik.errors.note}
            />
          </Grid>
          <Grid container item xs={3} spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ background: "#FF9E43" }} onClick={handleClose}>
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={() => setShouldOpenRegisterDialog(true)}>
                Thêm
              </Button>
            </Grid>
            {/* <Grid item onClick={handleSave}>
              <Button variant="contained" color="primary">
                Lưu
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={""}
            data={employeeData?.listRegister}
            columns={columns}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
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
        </Grid>
      </Grid>
      {/* {shouldOpenRegisterDialog && (
        <RegisterDialog
          handleClose={() => setShouldOpenRegisterDialog(false)}
          handleCloseAll={handleClose}
        />
      )} */}

      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => setShouldOpenConfirmationDeleteDialog(false)}
          onYesClick={() => { handleRemoveDocument() }}
          title="Xóa hồ sơ"
        />

      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldOpenDialog(true);
          }}
        />
      )}
    </form>

  );
}

export default RegisterDocument;
