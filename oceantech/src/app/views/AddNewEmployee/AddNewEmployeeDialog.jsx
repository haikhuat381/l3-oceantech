import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import { Dialog, DialogTitle, Box, Button, DialogActions, DialogContent } from "@mui/material";
import EmployeeRegisterDialog from "./EmployeeRegisterDialog";
import { Close } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EmployeeInfo from "./EmployeeInfo";
import EmployeeDiploma from "./EmployeeDiploma";
import EmployeeRelation from "./EmployeeRelation";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNewEmployee, updateEmployee, getEmployeeData } from "app/redux/actions/actions";

import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function AddNewEmployeeDialog(props) {
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState("none");
  const { handleClose } = props;
  const employee = useSelector((state) => state.Employee.employeeData);
  const [employeeData, setEmployee] = useState(employee);
  useEffect(() => {
    setEmployee(employee);
  }, [employee]);
  // console.log(employeeData)
  const handleAddToList = (data, method) => {
    setEmployee({ ...employeeData, [method]: [...employeeData[method], data] });
  };

  const [employeeId, setEmployeeId] = useState(employeeData.id);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(employeeId);
  console.log(employeeData);
  const formik = useFormik({
    initialValues: {
      fullName: employeeData?.fullName || "",
      code: employeeData?.code || "",
      phone: employeeData?.phone || "",

      email: employeeData?.email || "",
      address: employeeData?.address || "",
      identityCode: employeeData?.identityCode || "",
      placeIssue: employeeData?.placeIssue || null,
      ethnic: employeeData?.ethnic || "",
      religion: employeeData?.religion || "",
      salary: employeeData?.salary || "",
      birthplace: employeeData?.birthplace || "",
      district: employeeData?.district || null,
      province: employeeData?.province || null,
      commune: employeeData?.commune || null,
      gender: employeeData?.gender || "",
      position: employeeData.position || "",
      team: employeeData.team || "",
      birthday: employeeData?.birthday || "",
      dateIssue: employeeData?.dateIssue || "",
      image: employeeData?.image || "/assets/images/illustrations/dreamer.svg",
      listDiploma: employeeData?.listDiploma || [],
      listRelationship: employeeData?.listRelationship || [],
      education: employeeData?.education || [""],
      experience: employeeData?.experience || [""],
      generalIntroduction: employeeData?.generalIntroduction || [""],
      careerGoals: employeeData?.careerGoals || [""],
      skill: employeeData?.skill || [""],
      hobby: employeeData?.hobby || [""],
      status: employeeData?.status || "Lưu mới",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(30, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      email: Yup.string().email("Email sai định dạng").required("Không được bỏ trống"),
      code: Yup.string().required("Không được bỏ trống"),
      phone: Yup.string().required("Không được bỏ trống"),
      birthplace: Yup.string().required("Không được bỏ trống"),
      email: Yup.string().required("Không được bỏ trống"),
      address: Yup.string().required("Không được bỏ trống"),
      identityCode: Yup.string().required("Không được bỏ trống"),
      placeIssue: Yup.object().nullable().required("Chọn nơi cấp"),

      ethnic: Yup.string().required("Không được bỏ trống"),
      religion: Yup.string().required("Không được bỏ trống"),
      salary: Yup.string().required("Không được bỏ trống"),
      dateIssue: Yup.date().required("Vui lòng nhập ngày"),
      birthday: Yup.date()

        .max(new Date(Date.now() - 567648000000), "Yêu cầu trên 18 tuổi")
        .min(new Date(Date.now() - 1892160000000), "Yêu cầu dưới 60 tuổi")
        .required("Vui lòng nhập ngày"),

      gender: Yup.string().required("Không được bỏ trống"),
      province: Yup.object().nullable().required("Không được bỏ trống"),
      district: Yup.object().required("Không được bỏ trống").nullable(),
      commune: Yup.object().required("Không được bỏ trống").nullable(),
      team: Yup.string().required("Không được bỏ trống"),
      position: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      if (!employeeId) {
        values.id = uuidv4();
        values.status = "Lưu mới";
        setEmployeeId(values.id);
        values.listPromote = []
        values.listPropose = []
        values.listRegister = []
        values.listIncreaseSalary = []
        console.log("haha")
        console.log(values)
        dispatch(addNewEmployee(values));
        toast.success("Lưu mới thành công");
      } else {
        values.id = employeeId;
        values.listDiploma = employeeData.listDiploma;
        values.listRelationship = employeeData.listRelationship;
        const updateData = { ...employeeData, ...values };
        console.log("updateData");
        console.log(updateData);
        dispatch(updateEmployee(updateData));
        toast.success("Cập nhật thành công");
      }
      setSaved("block");
      setShouldOpenDialog(false);
    },
  });

  return (
    <>
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
      <Dialog open={true} maxWidth={"lg"} fullWidth={true}>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {!employeeData.id ? "Thêm mới nhân viên" : "Sửa nhân viên"}
          <Box onClick={() => handleClose()}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  background: "#ddd",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="Thông tin nhân viên" value="1" />
                  <Tab label="Thông tin  văn bằng" value="2" />
                  <Tab label="Thông tin quan hệ gia đình" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: "20px 0" }}>
                <EmployeeInfo formikRoot={formik} />
              </TabPanel>
              <TabPanel value="2" sx={{ p: "20px 0" }}>
                <EmployeeDiploma employeeData={employeeData} handleAddDiploma={handleAddToList} />
              </TabPanel>
              <TabPanel value="3" sx={{ p: "20px 0" }}>
                <EmployeeRelation employeeData={employeeData} handleAddRelation={handleAddToList} />
              </TabPanel>
            </TabContext>
          </DialogContent>

          <DialogActions>
            {/* <Button variant="contained" type="submit" sx={{ mb: 2, background: "#7467EF" }}>
              Lưu
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 2, background: "#339999", display: saved }}
              onClick={() => {
                setShouldOpenDialog("true");
              }}
            >
              Đăng kí
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 2, background: "#FF9E43" }}
              onClick={() => handleClose()}
            >
              Hủy
            </Button> */}

            <Button
              variant="contained"
              sx={{ mb: 2, background: "#FF9E43" }}
              onClick={() => handleClose()}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 2, background: "#339999", display: saved }}
              onClick={() => {
                setShouldOpenDialog("true");
              }}
            >
              Đăng kí
            </Button>
            <Button variant="contained" type="submit" sx={{ mb: 2, background: "#7467EF" }}>
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {shouldOpenDialog && (
        <EmployeeRegisterDialog
          handleAddToList={handleAddToList}
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {/* <EmployeeRegisterDialog
        formikRoot={formik}
        handleClose={() => {
          setShouldOpenDialog(false);
        }}
        handleAddToFomik={handleAddToFomik}
      /> */}
    </>
  );
}

export default AddNewEmployeeDialog;
