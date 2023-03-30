import React, { useState } from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReleaseDialog from "../ManageEmployee/ReleaseDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,
} from "app/redux/actions/actions";
import ApprovalDialog from "./ApprovalDialog";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function Approval() {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const handleClose = () => {
    setShouldOpenDialog(false);
    dispatch(getEmployeeData({}));
  };
  const columns = [
    {
      title: "Hành động",
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  setShouldOpenDialog(true);
                  dispatch(getEmployeeData(rowdata));
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
  useEffect(() => {
    dispatch(getListEmployeeRequest());
    dispatch(getListLocation());
    dispatch(getOtherFeature());
  }, []);

  const listApproval = useSelector((state) => state.Employee.listEmployee).filter((employee) => {
    return employee.status === "Chờ duyệt";
  });

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
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Chờ duyệt" }]} />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          data={listApproval}
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

            padding: "default",

            toolbar: true,
          }}
        />
      </Box>
      {shouldOpenDialog && <ApprovalDialog handleClose={handleClose} />}
    </Container>
  );
}

export default Approval;
