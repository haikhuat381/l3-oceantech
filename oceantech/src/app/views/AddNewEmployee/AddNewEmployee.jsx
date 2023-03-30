import React, { useEffect, useState } from "react";
import AddNewEmployeeDialog from "./AddNewEmployeeDialog";
import Breadcrumb from "app/components/Breadcrumb";
import { Button, Box, Icon, IconButton, styled, Tooltip } from "@mui/material";
import MaterialTable from "@material-table/core";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import ApprovedDialog from "../Approved/ApprovedDialog";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,
} from "app/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
const Container = styled("div")(() => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
  },
}));

function AddNewEmployee() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListEmployeeRequest());
    dispatch(getListLocation());
    dispatch(getOtherFeature());
  }, []);
  const listAddNew = useSelector((state) => state.Employee.listEmployee).filter((employee) => {
    return (
      employee.status !== "Chờ duyệt" &&
      employee.status !== "Đã duyệt" &&
      employee.status !== "Kết thúc" &&
      employee.releaseRequest === undefined
    );
  });
  const [employeeDelete, setEmployeeDelete] = useState("");
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] =
    useState(false);
  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      dispatch(getEmployeeData(rowdata));
      setShouldOpenDialog(true);
    }
    if (method === 0) {
      dispatch(deleteEmployee(rowdata.id));
      setshouldOpenConfirmationDeleteDialog(false);
      toast.success("Xóa nhân viên thành công");
    }
  };
  const handleClose = () => {
    setShouldOpenRequestDialog(false);
    setShouldOpenDialog(false);
    dispatch(getEmployeeData( {
      listDiploma: [],
      listRelationship: [],
      // listPromote:[],
    }));
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
            <Tooltip title="Xem chi tiết">
              <IconButton
                disabled={rowData.status !== "Lưu mới" ? false : true}
                onClick={() => {
                  setShouldOpenViewDialog(true);
                  dispatch(getEmployeeData(rowData));
                }}
              >
                <Icon color={rowData.status !== "Lưu mới" ? "success" : "disabled"}>
                  visibilityIcon
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                disabled={rowData.status === "Lưu mới" ? false : true}
                onClick={() => {
                  setEmployeeDelete(rowData);
                  setshouldOpenConfirmationDeleteDialog(true);
                }}
              >
                <Icon color={rowData.status === "Lưu mới" ? "error" : "disabled"} >delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ tên", field: "fullName" },
    {
      title: "Ngày sinh",
      field: "birthDay",
      render: (rowdata) => moment(rowdata).format("DD/MM/YYYY"),
    },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    { title: "Trạng thái", field: "status" },
  ];

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Quản lý", path: "/" }, { name: "Thêm mới nhân viên" }]}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm mới
        </Button>
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          data={listAddNew}
          columns={columns}
          options={{
            pageSize: 15,
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
      </Box>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setEmployeeDelete({});
          }}
          onYesClick={() => {
            handleChangeEmployee(employeeDelete, 0);
          }}
          title="Xóa nhân viên"
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

      {shouldOpenDialog && <AddNewEmployeeDialog handleClose={handleClose} />}
      {shouldOpenViewDialog && (
        <ApprovedDialog
          handleClose={() => {
            setShouldOpenViewDialog(false);
            dispatch(getEmployeeData({}));
          }}
        />
      )}
    </Container>
  );
}

export default AddNewEmployee;
