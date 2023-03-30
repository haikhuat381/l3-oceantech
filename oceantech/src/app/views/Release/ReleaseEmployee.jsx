import React from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,
} from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import ReleaseEmployeeDialog from "./ReleaseEmployeeDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
import SaveProfileInfo from "./SaveProfileInfo";
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

function ReleaseEmployee() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListEmployeeRequest());
    dispatch(getListLocation());
    dispatch(getOtherFeature());
  }, []);
  const [shouldOpenReleaseDialog, setShouldOpenReleaseDialog] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const listApproved = useSelector((state) => state.Employee.listEmployee).filter((employee) => {
    return employee.status === "Kết thúc" || employee.status === "Đã nộp lưu";
  });
  const handleClose = () => {
    setShouldOpenReleaseDialog(false);
    dispatch(getEmployeeData({}));
  };

  const columns = [
    {
      title: "Hành động",
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Thông tin ">
              <IconButton
                onClick={() => {
                  dispatch(getEmployeeData(rowdata));
                  setShouldOpenDialog(true);
                }}
                disabled={rowdata.status !== "Kết thúc" ? false : true}
              >
                <Icon color={rowdata.status !== "Kết thúc" ? "primary" : "disabled"}>report</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  setShouldOpenReleaseDialog(true);
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
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Kết thúc" }]} />
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          data={listApproved}
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
            // exportButton: true,
            toolbar: true,
          }}
        />
      </Box>
      {shouldOpenReleaseDialog && <ReleaseEmployeeDialog handleClose={handleClose} />}
      {shouldOpenDialog && (
        <SaveProfileInfo
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default ReleaseEmployee;
