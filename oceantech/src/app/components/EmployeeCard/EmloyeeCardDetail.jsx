import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];
const EmployeeCardDetail = (props) => {
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });

  return (
    <Card>
      <CardHeader title="Thông tin " />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Họ và tên"
              variant="outlined"
              defaultValue={"Bùi Trịnh Huy"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Mã nhân viên"
              variant="outlined"
              defaultValue={"1235467"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Email"
              variant="outlined"
              defaultValue={"huydauboi@gmail.com"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Số điện thoại"
              variant="outlined"
              defaultValue={"0329292988"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Ngày sinh"
              variant="outlined"
              defaultValue={"26072003"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              label="Số căn cước công dân"
              defaultValue={"03521115315"}
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  );
};
export default EmployeeCardDetail;
