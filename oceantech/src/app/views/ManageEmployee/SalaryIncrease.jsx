import React from "react";
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialTable from "@material-table/core";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import SalaryIncreaseDialog from "./SalaryIncreaseDialog";
import { updateEmployee, getEmployeeData } from "app/redux/actions/actions";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";

function SalaryIncrease(props) {
  const employee = useSelector((state) => state.Employee.employeeData);
  const [shouldOpenSalaryIncreaseDialog, setShouldOpenSalaryIncreaseDialog] = useState(false);
  const [dataIncrease, setDataIncrease] = useState({})
  const [employeeData, setEmployee] = useState(employee);
  const [listIncrease, setListIncrease] = useState({})
  const dispatch = useDispatch();
  const [shouldOpenConfirmationDeleteDialog, setShouldOpenConfirmationDeleteDialog] = useState(false)
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [rowDataInfo, setRowDataInfo] = useState()


  const formik = useFormik({
    initialValues: {
      time: "",
      reason: "",
      rank: "",
      note: "",
      date: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Không được bỏ trống"),
      rank: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      time: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      delete employeeData.releaseRequest
      setDataIncrease(values)
      setShouldOpenSalaryIncreaseDialog(true)
      if (!values.id) {
        values.id = uuidv4();
        setEmployee({ ...employeeData, "listIncreaseSalary": [...employeeData.listIncreaseSalary, { ...values, "status": "Lưu mới" }] })
        const data = { ...employeeData, "listIncreaseSalary": [...employeeData.listIncreaseSalary, { ...values, "status": "Lưu mới" }] }
        dispatch(updateEmployee(data))
        toast.success("Thêm thành công");
      } else {
        const newListFilter = employeeData.listIncreaseSalary.filter((Salary) => Salary.id !== values.id);
        employeeData.listIncreaseSalary = newListFilter
        employeeData.listIncreaseSalary.push({ ...values, "status": "Lưu mới" })
        dispatch(updateEmployee(employeeData))
        toast.success("Sửa thành công");
      }

      resetForm()
    }
  });
  const [listSalary, setListSalary] = useState([]);

  const handleEditSalary = (rowData) => {
    formik.setValues(rowData);
  };
  const handleRemoveSalary = (rowData) => {
    employeeData.listIncreaseSalary = employeeData.listIncreaseSalary.filter((Salary) => Salary.id !== listIncrease.id);
    setEmployee(employeeData)
    dispatch(updateEmployee(employeeData))
    setShouldOpenConfirmationDeleteDialog(false)
    toast.success("Xóa thành công");
  };
  const handleSave = () => {

  };
  const { handleClose } = props;
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                disabled={ rowData.status !=="Lưu mới" && (rowData.additionInfo || rowData.refuseInfo) ? false : true}
                onClick={() => {

                  if (rowData.additionInfo) {
                    // setRowDataInfo(rowData.additionInfo?.content)
                    setRowDataInfo({ ...rowData.additionInfo, status: "Yêu cầu bổ sung" })

                  }
                  if (rowData.refuseInfo) {
                    // setRowDataInfo(rowData.refuseInfo?.content)
                    setRowDataInfo({ ...rowData.refuseInfo, status: "Từ chối" })
                    console.log("hai")
                    console.log({ ...rowData.refuseInfo, status: "Từ chối" })

                  }
                  // setRowDataInfo(rowData);
                  console.log('ROW DATA:', rowData);
                  setShouldOpenRequestDialog(true);
                  
                }}
              >
                <Icon
                  color={rowData.status !=="Lưu mới" &&(rowData.additionInfo || rowData.refuseInfo) ? "primary" : "disabled"}
                >
                  report
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                onClick={() => {
                  handleEditSalary(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  setShouldOpenConfirmationDeleteDialog(true)
                  setListIncrease(rowData)
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Lần", field: "time" },
    { title: "Bậc", field: "rank" },
    { title: "Lý do", field: "reason" },
    { title: "Ngày", field: "date" },
    { title: "Ghi chú", field: "note" },
    { title: "Trạng thái", field: "status" },

  ];
  return (

    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={5}>
              <TextField
                size="small"
                label="Ngày tăng lương"
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
                fullWidth
                label="Lần thứ"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                error={formik.errors.time && formik.touched.time}
                helperText={formik.errors.time}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                label="Bậc"
                name="rank"
                value={formik.values.rank}
                onChange={formik.handleChange}
                error={formik.errors.rank && formik.touched.rank}
                helperText={formik.errors.rank}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={5}>
              <TextField
                size="small"
                fullWidth
                label="Lý do tăng lương"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.errors.reason && formik.touched.reason}
                helperText={formik.errors.reason}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                label="Ghi chú"
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
                <Button variant="contained" color="primary" type="submit" >
                  Lưu
                </Button>
              </Grid>
              {/* <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title={""}
              data={employeeData?.listIncreaseSalary}
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
      </form>
      {shouldOpenSalaryIncreaseDialog && (
        <SalaryIncreaseDialog
          dataIncrease={dataIncrease}
          handleClose={() => setShouldOpenSalaryIncreaseDialog(false)}
          handleCloseAll={handleClose}
        />
      )}

      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => setShouldOpenConfirmationDeleteDialog(false)}
          onYesClick={() => { handleRemoveSalary() }}
          title="Xóa tăng lương"
        />
      )}
       {shouldOpenRequestDialog && (
        <MoreInfoDialog
          rowDataInfo={rowDataInfo}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldOpenSalaryIncreaseDialog(true);
          }}
        />
      )}
    </>
  );
}

export default SalaryIncrease;
