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
import ApprovedDialog from "./ApprovedDialog";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function Approved() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListEmployeeRequest());
    dispatch(getListLocation());
    dispatch(getOtherFeature());
  }, []);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const listApproved = useSelector((state) => state.Employee.listEmployee).filter((employee) => {
    return (
      employee.status === "Đã duyệt" ||
      employee.status === "Kết thúc" ||
      employee.status === "Đã nộp lưu" ||
      (employee.releaseRequest !== undefined && employee.status === "Yêu cầu bổ sung") ||
      (employee.releaseRequest !== undefined && employee.status === "Từ chối")
    );
  });
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
  ];
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Đã duyệt" }]} />
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
      {shouldOpenDialog && <ApprovedDialog handleClose={handleClose} />}
    </Container>
  );
}

export default Approved;
