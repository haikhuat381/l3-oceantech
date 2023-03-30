import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Select,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  Tooltip,
} from "@mui/material";
import MaterialTable from "@material-table/core";
import { InputAdornment, Input } from "@mui/material";
import CustomAvatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
const CurriculumVitae = React.forwardRef((props, ref) => {
  const { employeeData, handleChangeEmployee, handleAddRelation, status } = props;
  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);
  const columns = [
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
    <div ref={ref}>
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h5">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Độc lập - Tự do - Hạnh phúc </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>-------------------------------------</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={14} padding={4} alignItems={"center"}>
        <Grid item xs={4} textAlign="center">
          <CustomAvatar image={employeeData.image} displayButton={"none"} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">SƠ YẾU LÝ LỊCH</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={1}>
              I. BẢN THÂN
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={8}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">1. Họ và tên (chữ in hoa)</InputAdornment>
                }
                name="fullName"
                readOnly={status}
                // value={formikRoot.values.fullName}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.fullName && formikRoot.touched.fullName}
                // helperText={formikRoot.errors.fullName}
                value={employeeData.fullName}
                onChange={(event) => {
                  handleChangeEmployee(event, "fullName");
                }}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Input
                id="standard-adornment-amount"
                fullWidth
                name="gender"
                onChange={formikRoot.handleChange}
                value={formikRoot.values.gender}
                error={formikRoot.errors.gender && formikRoot.errors.gender}
                helperText={formikRoot.errors.gender}
                startAdornment={<InputAdornment position="start"> Giới tính</InputAdornment>}
              /> */}
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">Giới tính</InputAdornment>,
                  readOnly: status,
                }}
                fullWidth
                select
                variant="standard"
                value={employeeData.gender}
                name="gender"
                // onChange={formikRoot.handleChange}
                onChange={(event) => {
                  handleChangeEmployee(event, "gender");
                }}
              >
                {otherFeature.Gender.map((item) => (
                  <MenuItem key={item.id} value={item.gender}>
                    {item.gender}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Input
              id="standard-adornment-amount"
              fullWidth
              startAdornment={
                <InputAdornment position="start">2. Họ tên thường dùng</InputAdornment>
              }
            />
          </Grid> */}
          <Grid item xs={12}>
            <Input
              type="date"
              readOnly={status}
              id="standard-adornment-amount"
              fullWidth
              startAdornment={<InputAdornment position="start">2. Sinh ngày</InputAdornment>}
              value={employeeData.birthday || null}
              name="birthday"
              onChange={(event) => {
                handleChangeEmployee(event, "birthday");
              }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.birthday && formikRoot.errors.birthday}
              // helperText={formikRoot.errors.birthday}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="standard-adornment-amount"
              fullWidth
              readOnly={status}
              startAdornment={<InputAdornment position="start">3. Chỗ ở hiện nay</InputAdornment>}
              value={employeeData.address}
              name="address"
              onChange={(event) => {
                handleChangeEmployee(event, "address");
              }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.address && formikRoot.errors.address}
              // helperText={formikRoot.errors.address}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">4. Điện thoại</InputAdornment>}
                value={employeeData.phone}
                name="phone"
                onChange={(event) => {
                  handleChangeEmployee(event, "phone");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.phone && formikRoot.touched.phone}
                // helperText={formikRoot.errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">Email</InputAdornment>}
                name="email"
                value={employeeData.email}
                onChange={(event) => {
                  handleChangeEmployee(event, "email");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.email && formikRoot.touched.email}
                // helperText={formikRoot.errors.email}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">5. Dân tộc</InputAdornment>}
                name="ethnic"
                value={employeeData.ethnic}
                onChange={(event) => {
                  handleChangeEmployee(event, "ethnic");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.ethnic && formikRoot.touched.ethnic}
                // helperText={formikRoot.errors.ethnic}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">Tôn giáo</InputAdornment>}
                name="religion"
                value={employeeData.religion}
                onChange={(event) => {
                  handleChangeEmployee(event, "religion");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.religion && formikRoot.touched.religion}
                // helperText={formikRoot.errors.religion}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">6. Số CCCD</InputAdornment>}
                name="identityCode"
                value={employeeData.identityCode}
                onChange={(event) => {
                  handleChangeEmployee(event, "identityCode");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.identityCode && formikRoot.touched.identityCode}
                // helperText={formikRoot.errors.identityCode}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="date"
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">Cấp ngày</InputAdornment>}
                value={employeeData.dateIssue || null}
                name="dateIssue"
                onChange={(event) => {
                  handleChangeEmployee(event, "dateIssue");
                }}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.dateIssue && formikRoot.errors.dateIssue}
                // helperText={formikRoot.errors.dateIssue}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start">Nơi cấp</InputAdornment>,
                readOnly: status,
              }}
              fullWidth
              select
              variant="standard"
              value={employeeData?.placeIssue?.place}
              // onChange={(event) => {
              //   formikRoot.setFieldValue("placeIssue", { place: event.target.value });
              // }}
              onChange={(event) => {
                handleChangeEmployee(event, "placeIssue");
              }}
            >
              {otherFeature.placeIssue.map((item) => (
                <MenuItem key={item.id} value={item.place}>
                  {item.place}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={2}>
              II. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title={""}
              data={employeeData.listRelationship}
              columns={columns}
              options={{
                pageSize: 15,
                pageSizeOptions: [5, 10, 15, 20],
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                    height: "48px",
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
      </Grid>
    </div>
  );
});

export default CurriculumVitae;
