import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import RefuseDialog from "./RefuseDialog";
import AcceptDialog from "./AcceptDialog";
import { useState } from "react";
import { updateEmployee } from "app/redux/actions/actions";
import ResignationLetter from "app/components/ResignationLetter/ResignationLetter";
import ReleaseDialog from "../ManageEmployee/ReleaseDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Box,
  IconButton,
  Icon,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "@material-table/core";
import PromotionLetter from "app/components/PromotionLetter/PromotionLetter";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";
import IncreaseDialogLetter from "app/components/IncreaseLetter/IncreaseDialogLetter"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ApprovalDialog({ handleClose }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [shouldOpenRefuseDialog, setShouldOpenRefuseDialog] = useState(false);
  const [shouldOpenAcceptDialog, setShouldOpenAcceptDialog] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const employeeData = useSelector((state) => state.Employee.employeeData);
  console.log("haikhuat");
  console.log(employeeData);
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton>
                <Icon color="success">visibilityIcon</Icon>
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
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {employeeData.releaseRequest  ? (
            <ResignationLetter />
          ) : employeeData.promoteRequest ? (<PromotionLetter/>) : employeeData.proposeRequest ? (<PropostionLetter/>) 
          : employeeData.increaseRequest ? <IncreaseDialogLetter /> : (
            <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="Hồ sơ" {...a11yProps(0)} />
                <Tab label="Sơ yếu lý lịch" {...a11yProps(2)} />
                <Tab label="Danh sách văn bằng" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0} style={{ width: "100%" }}>
                <Resume employee={employeeData} display={"none"} status={true} />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ width: "100%" }}>
                <CurriculumVitae employeeData={employeeData} status={true} />
              </TabPanel>
              <TabPanel value={value} index={2} style={{ width: "100%" }}>
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

                    // padding: 'dense',
                    padding: "default",
                    // search: false,
                    // exportButton: true,
                    toolbar: false,
                  }}
                />
              </TabPanel>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ background: "#FF9E43", mb: 1 }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 1 }}
            onClick={() => {
              setShouldOpenRefuseDialog(true);
            }}
          >
            Từ Chối
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ mb: 1 }}
            onClick={() => {
              setShouldOpenAcceptDialog(true);
            }}
          >
            Duyệt
          </Button>
          <Button
            sx={{ mb: 1 }}
            variant="contained"
            color="primary"
            onClick={() => {
              setShouldOpenRequestDialog(true);
            }}
          >
            Yêu cầu bổ sung
          </Button>
        </DialogActions>
      </Dialog>

      {shouldOpenRequestDialog && (
        <AdditionalRequestDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {shouldOpenRefuseDialog && (
        <RefuseDialog
          handleClose={() => {
            setShouldOpenRefuseDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {shouldOpenAcceptDialog && (
        <AcceptDialog
          handleClose={() => {
            setShouldOpenAcceptDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
    </>
  );
}
// {shouldOpenDialog && ! ? (
//   <ApprovalDialog handleClose={() => setShouldOpenDialog(false)} />
// ) : shouldOpenDialog && employeeData.releaseRequest ? (
//   <ReleaseDialog handleClose={() => setShouldOpenDialog(false)} />
// ) : null}
