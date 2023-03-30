import React from "react";
import { useState, useEffect } from "react";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,
} from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
import ManagerEmployeeDialog from "./ManagerEmployeeDialog";
import ReleaseDialog from "./ReleaseDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function ManagerEmployee() {
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListEmployeeRequest());
    dispatch(getListLocation());
    dispatch(getOtherFeature());
  }, []);
  const [openManagerEmployeeDialog, setOpenManagerEmployeeDialog] = useState(false);
  const employeeData = useSelector((state) => state.Employee.employeeData);

  const listEmployee = useSelector((state) => state.Employee.listEmployee).filter((employee) => {
    return (
      employee.status === "Đã duyệt" || 
      (employee.releaseRequest !== undefined && employee.status === "Yêu cầu bổ sung") ||
      (employee.releaseRequest !== undefined && employee.status === "Từ chối")
    );
  });
  const handleClose = () => {
    setShouldOpenDialog(false);
  };
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                disabled={rowData.status === "Đã duyệt" ? true : false}
                onClick={() => {
                  dispatch(getEmployeeData(rowData));
                  setShouldOpenDialog(true);
                }}
              >
                <Icon color={rowData.status === "Đã duyệt" ? "disabled" : "primary"}>report</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Cập nhật diễn biến">
              <IconButton
                onClick={() => {
                  setOpenManagerEmployeeDialog(true);
                  dispatch(getEmployeeData(rowData));
                }}
              >
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ tên", field: "fullName" },
    { title: "Vị trí", field: "position" },
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
          routeSegments={[{ name: "Quản lý", path: "/" }, { name: "Quản lý nhân viên" }]}
        />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          data={listEmployee}
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
              backgroundColor: "#222943",
              color: "#fff",
            },
            // padding: 'dense',
            padding: "default",
            // search: false,
            // exportButton: true,0
            toolbar: true,
          }}
        />
      </Box>
      {openManagerEmployeeDialog && (
        <ManagerEmployeeDialog
          handleClose={() => {
            setOpenManagerEmployeeDialog(false);
            // dispatch(getEmployeeData({}));
            dispatch(getEmployeeData({
              listDiploma: [],
              listRelationship: [],
              // listPromote:[],
            }));
          }}
        />
      )}
      {shouldOpenDialog && (
        <MoreInfoDialog
          handleClose={handleClose}
          openEditDialog={() => {
            setOpenManagerEmployeeDialog(true);
          }}
        />
      )}
    </Container>
  );
}

export default ManagerEmployee;
