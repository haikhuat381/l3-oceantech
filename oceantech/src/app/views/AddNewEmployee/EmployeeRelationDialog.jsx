import React from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";

import * as Yup from "yup";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/actions";
import { v4 as uuidv4 } from "uuid";
function EmployeeRelationDialog(props) {
  const dispatch = useDispatch();
  const { open, handleClose, handleAddRelation, employee, relationshipData } = props;

  const location = useSelector((state) => state.Location.location);
  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);
  const formik = useFormik({
    initialValues: {
      name: relationshipData?.name || "",
      gender: relationshipData?.gender || "",
      birthday: relationshipData?.birthday || "",
      relationship: relationshipData?.relationship || "",
      province: relationshipData?.province || null,
      district: relationshipData?.district || null,
      commune: relationshipData?.commune || null,
      address: relationshipData?.address || "",
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
      console.log(values);
      if (Object.keys(relationshipData).length === 0) {
        values.id = uuidv4();
        handleAddRelation(values, "listRelationship");
      } else {
        values.id = relationshipData.id;
        employee.listRelationship = employee.listRelationship.filter(
          (relationship) => relationship.id !== values.id
        );
        employee.listRelationship.push(values);
      }
      handleClose();
    },
  });

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Thêm quan hệ
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
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
                value={formik.values.name}
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
                value={formik.values.birthday}
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
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address && formik.touched.address}
                helperText={formik.errors.address}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EmployeeRelationDialog;
