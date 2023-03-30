import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/actions";
import MaterialTable from "@material-table/core";
import {
  Button, Box, Icon, IconButton, styled, Tooltip, DialogContent, Grid,
  TextField,
  MenuItem,
  DialogActions
} from "@mui/material";
import EmployeeRelationDialog from "./EmployeeRelationDialog";
import * as Yup from "yup";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import { v4 as uuidv4 } from "uuid";

import { useFormik } from "formik";
function EmployeeRelation(props) {
  const dispatch = useDispatch();
  const { employeeData, employee, handleAddRelation, relationshipData } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [relationship, setRelationship] = useState({});
  const location = useSelector((state) => state.Location.location);

  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);

  // const handleClose = () => {
  //   // setShouldOpenDialog(false);
  //   setRelationship({});
  // };
  const [shouldOpenConfirmationDeleteDialog, setshouldOpenConfirmationDeleteDialog] =
    useState(false);
  const handleChangeEmployee = (rowdata, method) => {
    if (method == 1) {
      console.log(relationship);
      setRelationship(rowdata)
      formik.setValues(rowdata)
      // handleClose()
    }
    if (method == 0) {
      setRelationship(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: relationship?.name || "",
      gender: relationship?.gender || "",
      birthday: relationship?.birthday || "",
      relationship: relationship?.relationship || "",
      province: relationship?.province || null,
      district: relationship?.district || null,
      commune: relationship?.commune || null,
      address: relationship?.address || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(30, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      gender: Yup.string().required("Không được bỏ trống"),
      province: Yup.object().required("Không được bỏ trống").nullable(),
      district: Yup.object().nullable().required("Không được bỏ trống"),
      commune: Yup.object().nullable().required("Không được bỏ trống"),
      address: Yup.string().nullable().required("Không được bỏ trống"),
      birthday: Yup.date().required("Vui lòng nhập ngày"),
      relationship: Yup.object().required("Không được bỏ trống").nullable(),
    }),

    onSubmit: (values) => {
      // if (Object.keys(relationship).length === 0) {
      if (!values.id) {
        values.id = uuidv4()
        handleAddRelation(values, "listRelationship")
        formik.resetForm()

      } else {

        console.log(values);
        values.id = relationship.id;
        console.log('EMPLOYEE DATA TRƯỚC: ',employeeData.listRelationship);
        
        employeeData.listRelationship = employeeData.listRelationship.filter(
          (relationship) => relationship.id !== values.id
          );
          console.log('VALUES: ',values);
        console.log('EMPLOYEE DATA SAU: ',employeeData.listRelationship);
        employeeData.listRelationship.push(values);
        console.log('EMPLOYEE SAU KHI PUSH: ',employeeData.listRelationship);
        formik.resetForm()
      }
      formik.resetForm()
      // handleClose()
      formik.values=employee
    },
  });


  const handleDeleteRelationship = () => {
    employeeData.listRelationship = employeeData.listRelationship.filter(
      (Relationship) => Relationship.id !== relationship.id
    );
    setshouldOpenConfirmationDeleteDialog(false);
    setRelationship({});
  };
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                onClick={() => {
                  handleChangeEmployee(rowData, 0);
                }}
              >
                <Icon color={"error"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ và tên", field: "name" },
    {
      title: "Ngày sinh ",
      field: "birthday",
    },
    { title: "Giới tính", field: "gender" },
    {
      title: "Quan hệ",
      render: (rowData) => rowData.relationship.relationship,
    },
    { title: "Địa chỉ", field: "address" },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setRelationship({});
          }}
          onYesClick={() => {
            handleDeleteRelationship();
          }}
          title="Xóa quan hệ"
        />
      )}
      {/* <Box className="box" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => {
            setShouldOpenDialog(true);
          }}
        >
          Thêm mới
        </Button>

      </Box> */}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item sm={4} xs={4} className="input-dialog">
              <TextField
                label="Họ và Tên"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                size="small"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                error={formik.errors.name && formik.touched.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Ngày sinh"
                variant="outlined"
                name="birthday"
                value={formik.values.birthday || ""}
                onChange={formik.handleChange}
                error={formik.errors.birthday && formik.touched.birthday}
                helperText={formik.errors.birthday}
              />
            </Grid>
            <Grid item sm={2} xs={2} className="input-dialog">
              <TextField
                select
                label="Giới tính"
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                name="gender"
                value={formik.values.gender || ""}
                onChange={formik.handleChange}
                error={formik.errors.gender && formik.touched.gender}
                helperText={formik.errors.gender}
              >
                {otherFeature.Gender.map((item) => (
                  <MenuItem key={item.id} value={item.gender}>
                    {item.gender}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                select
                label="Quan hệ"
                type="text"
                fullWidth
                variant="outlined"
                name="relationship"
                size="small"
                value={formik.values?.relationship?.relationship || ""}
                onChange={(event) => {
                  formik.setFieldValue("relationship", { relationship: event.target.value });
                }}
                error={formik.errors.relationship && formik.touched.relationship}
                helperText={formik.errors.relationship}
              >
                {otherFeature.relationship.map((item) => (
                  <MenuItem value={item.relationship}>{item.relationship}</MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                size="small"
                fullWidth
                disablePortal
                value={formik.values?.relationship || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("relationship", newValue);
                }}
                options={otherFeature.relationship}
                getOptionLabel={(option) => option.relationship}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Mối quan hệ"
                    error={formik.errors.relationship && formik.touched.relationship}
                    helperText={formik.errors.relationship}
                  />
                )}
              /> */}
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                select
                fullWidth
                size="small"
                label="Tỉnh/Thành phố"
                variant="outlined"
                value={formik.values?.province?.name || ""}
                name="province"
                onChange={(event) => {
                  formik.setFieldValue("province", { name: event.target.value });
                }}
                error={formik.errors.province && formik.errors.province}
                helperText={formik.errors.province}
              >
                {location.provinces.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                size="small"
                fullWidth
                disablePortal
                value={formik.values?.province || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("province", newValue);
                }}
                options={location.provinces}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Tỉnh thành phố"
                    error={formik.errors.province && formik.touched.province}
                    helperText={formik.errors.province}
                  />
                )}
              /> */}
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                fullWidth
                size="small"
                select
                label="Quận/Huyện"
                variant="outlined"
                value={formik.values?.district?.name || ""}
                name="district"
                onChange={(event) => {
                  formik.setFieldValue("district", { name: event.target.value });
                }}
                error={formik.errors.district && formik.errors.district}
                helperText={formik.errors.district}
              >
                {location.districts.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                size="small"
                fullWidth
                disablePortal
                value={formik.values?.district || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("district", newValue);
                }}
                options={location.districts}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Quận/Huyện"
                    error={formik.errors.district && formik.touched.district}
                    helperText={formik.errors.district}
                  />
                )}
              /> */}
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                select
                fullWidth
                size="small"
                label="Xã/Phường"
                variant="outlined"
                value={formik.values?.commune?.name || ""}
                name="commune"
                onChange={(event) => {
                  formik.setFieldValue("commune", { name: event.target.value });
                }}
                error={formik.errors.commune && formik.errors.commune}
                helperText={formik.errors.commune}
              >
                {location.communes.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                size="small"
                fullWidth
                disablePortal
                value={formik.values?.commune || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("commune", newValue);
                }}
                options={location.communes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Xã Phường"
                    error={formik.errors.commune && formik.touched.commune}
                    helperText={formik.errors.commune}
                  />
                )}
              /> */}
            </Grid>
            <Grid item sm={3} xs={3} className="input-dialog">
              <TextField
                label="Địa chỉ cụ thể"
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                name="address"
                value={formik.values.address || ""}
                onChange={formik.handleChange}
                error={formik.errors.address && formik.touched.address}
                helperText={formik.errors.address}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={formik.resetForm}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="button" onClick={formik.handleSubmit}>
            Lưu
          </Button>
        </DialogActions>
      </form>
      <MaterialTable
        title={""}
        data={employeeData?.listRelationship}
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
      {shouldOpenDialog && (
        <EmployeeRelationDialog
          open={open}
          handleClose={handleClose}
          employee={employeeData}
          handleAddRelation={handleAddRelation}
          relationshipData={relationship}
        />
      )}
    </>
  );
}

export default EmployeeRelation;
