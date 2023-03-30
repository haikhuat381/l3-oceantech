import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField, Grid, Button, Icon, Tooltip, IconButton } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateEmployee, getEmployeeData } from "app/redux/actions/actions";
import { use } from "echarts";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import PromoteDialog from "./PromoteDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";



function Promote(props) {
  const { handleClose } = props;

  const dispatch = useDispatch();

  // const [listPromote, setListPromote] = useState([]);
  const employee = useSelector((state) => state.Employee.employeeData);
  const [employeeData, setEmployee] = useState(employee);

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const [rowDataInfo, setRowDataInfo] = useState();
  const [rowData, setRowData] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);

  const [promoteDataDialog, setPromoteDataDialog] = useState({});


  const [promoteData, setPromoteData] = useState({});
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] =
    useState(false);
  // console.log("cach" , employee)
  // console.log(employeeData)

  useEffect(() => {
    setEmployee(employee)
  }, [employee])

  console.log("employeeData")
  console.log(employeeData)

  const handleEditPromote = (rowData) => {
    formik.setValues(rowData);
  };

  const handleRemovePromote = (rowData) => {
    // const newListFilter = listPromote.filter((Promote) => Promote.id != rowData.id);
    // setListPromote([...newListFilter]);
    console.log(rowData);
    console.log(employeeData.listPromote);
    // employeeData.listPromote = employeeData.listPromote.filter((promote) => promote.id !== values.id);
    employeeData.listPromote = employeeData.listPromote.filter((promote) => promote.id !== promoteData.id);
    console.log(employeeData);
    setEmployee(employeeData)
    dispatch(updateEmployee(employeeData))
    setshouldOpenConfirmationDeleteDialog(false)
    toast.success("Xóa thành công");
  };

  const handleSavePromote = () => {
    setShouldOpenDialog(true)
    // toast.success("Thêm thành công");
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
      time: "",
      note: "",
      date: "",
      oldPosition: "",
      currentPosition: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      time: Yup.string().required("Không được bỏ trống"),
      oldPosition: Yup.string().required("Không được bỏ trống"),
      currentPosition: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      // setPromoteDataDialog({ ...employeeData, "listPromote": [...employeeData.listPromote, values] })
      // values.status = "Chờ duyệt"
      setPromoteDataDialog(values)
      setShouldOpenDialog(true)

      console.log("employee truoc khi sua,", employeeData);
      if (!values.id) {

        console.log("them");
        values.id = uuidv4();

        // setListPromote([...listPromote, values]);
        setEmployee({ ...employeeData, "listPromote": [...employeeData.listPromote, { ...values, status: "Lưu mới" }] });
        const dataUpdate = { ...employeeData, "listPromote": [...employeeData.listPromote, { ...values, status: "Lưu mới" }] }
        // console.log(values)
        console.log("hai")
        console.log(employeeData)
        dispatch(updateEmployee(dataUpdate))
        toast.success("Thêm thành công");
      } else {
        console.log("sua");
        // const newListFilter = listPromote.filter((Promote) => Promote.id != values.id);
        // setEmployee([...newListFilter, values]);

        employeeData.listPromote = employeeData.listPromote.filter((promote) => promote.id !== values.id);
        console.log(employeeData)
        employeeData.listPromote.push({ ...values, status: "Lưu mới" });
        dispatch(updateEmployee(employeeData))
        toast.success("Sửa thành công");
      }
      resetForm();
    },
  });

  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                disabled={(rowData.additionalRequest || rowData.refuseInfo) && rowData.status !== "Lưu mới" ? false : true}
                onClick={() => {
                  // dispatch(getEmployeeData(rowData));
                  // setIdRowDataInfo(rowData.id)
                  console.log(rowData)
                  if (rowData.additionalRequest) {
                    // setRowDataInfo(rowData.additionalRequest?.content)
                    setRowDataInfo({ ...rowData.additionalRequest, status: "Yêu cầu bổ sung" })

                  }
                  if (rowData.refuseInfo) {
                    // setRowDataInfo(rowData.refuseInfo?.content)
                    setRowDataInfo({ ...rowData.refuseInfo, status: "Từ chối" })
                    console.log("hai")
                    console.log({ ...rowData.refuseInfo, status: "Từ chối" })

                  }
                  setRowData(rowData)
                  setShouldOpenRequestDialog(true);
                }}
              >
                <Icon
                  color={(rowData.additionalRequest || rowData.refuseInfo) && rowData.status !== "Lưu mới" ? "primary" : "disabled"}
                >
                  report
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                disabled={rowData.status === "Đã duyệt" ? true : false}
                color="primary"
                onClick={() => {
                  handleEditPromote(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                disabled={rowData.status === "Đã duyệt" ? true : false}
                color="error"
                onClick={() => {
                  setshouldOpenConfirmationDeleteDialog(true);
                  setPromoteData(rowData)
                  // handleChangePromote(rowData);
                  // handleRemovePromote(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Lưu">
              <IconButton
                color="primary"
                onClick={() => {
                  // setPromoteDataDialog({ ...employeeData, "listPromote": [rowData] })
                  setPromoteDataDialog(rowData)
                  setShouldOpenDialog(true)
                }}
              >
                <Icon>save</Icon>
              </IconButton>
            </Tooltip> */}
          </>
        );
      },
    },

    { title: "Chức vụ cũ", field: "oldPosition" },
    { title: "Chực vụ hiện tại", field: "currentPosition" },
    { title: "Lý do", field: "reason" },

    { title: "Ngày", field: "date" },
    { title: "Ghi chú", field: "note" },
    { title: "Trạng thái", field: "status" },
  ];
  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
          }}
          onYesClick={() => {
            handleRemovePromote()
          }}
          title="Xóa thăng chức"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={3}>
              <TextField
                size="small"
                label="Ngày tăng chức"
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
            <Grid item xs={3}>
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
                label="Chức vụ cũ"
                name="oldPosition"
                value={formik.values.oldPosition}
                onChange={formik.handleChange}
                error={formik.errors.oldPosition && formik.touched.oldPosition}
                helperText={formik.errors.oldPosition}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                label="Chức vụ hiện tại"
                name="currentPosition"
                value={formik.values.currentPosition}
                onChange={formik.handleChange}
                error={formik.errors.currentPosition && formik.touched.currentPosition}
                helperText={formik.errors.currentPosition}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Lý do"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.errors.reason && formik.touched.reason}
                helperText={formik.errors.reason}
              />
            </Grid>
            <Grid item xs={3}>
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
                <Button variant="contained" sx={{ background: "#FF9E43" }} onClick={() => { handleClose() }}>
                  Hủy
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Lưu
                </Button>
              </Grid>
              {/* <Grid item>
                <Button variant="contained" color="primary" onClick={handleSavePromote}>
                  Lưu
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title={""}
              // data={listPromote}
              data={employeeData?.listPromote || employeeData?.status}
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

      {shouldOpenDialog && (
        <PromoteDialog
          promoteDataDialog={promoteDataDialog}
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
        />
      )}

      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          rowDataInfo={rowDataInfo}
          rowData={rowData}

          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleEditPromote={handleEditPromote}
          openEditDialog={() => {
            // setShouldOpenDialog(true);
            setShouldOpenRequestDialog(false)
            handleEditPromote(rowData)
            // handleEditPromote()
          }}
        />
      )}

    </>
  );
}

export default Promote;
