import React from "react";
import { Grid, Box, TextField, MenuItem, Card } from "@mui/material/";
import styled from "@emotion/styled";
import { Paragraph } from "app/components/Typography";
import { useSelector } from "react-redux";
import CustomAvatar from "app/components/Avatar/Avatar";
function EmployeeInfo(props) {
  const { formikRoot } = props;

  const location = useSelector((state) => state.Location.location);
  const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item container xs={12} spacing={8}>
          <Grid item container xs={9}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tên nhân viên"
                  variant="outlined"
                  name="fullName"
                  value={formikRoot.values.fullName}
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.fullName && formikRoot.touched.fullName}
                  helperText={formikRoot.errors.fullName}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Mã nhân viên"
                  variant="outlined"
                  value={formikRoot.values.code}
                  name="code"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.code && formikRoot.touched.code}
                  helperText={formikRoot.errors.code}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Giới tính"
                  variant="outlined"
                  value={formikRoot.values.gender}
                  name="gender"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.gender && formikRoot.errors.gender}
                  helperText={formikRoot.errors.gender}
                >
                  {otherFeature.Gender.map((item) => (
                    <MenuItem key={item.id} value={item.gender}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày sinh"
                  variant="outlined"
                  value={formikRoot.values.birthday || null}
                  name="birthday"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.birthday && formikRoot.errors.birthday}
                  helperText={formikRoot.errors.birthday}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tôn giáo"
                  variant="outlined"
                  name="religion"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.religion}
                  error={formikRoot.errors.religion && formikRoot.touched.religion}
                  helperText={formikRoot.errors.religion}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Dân tộc"
                  variant="outlined"
                  name="ethnic"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.ethnic}
                  error={formikRoot.errors.ethnic && formikRoot.touched.ethnic}
                  helperText={formikRoot.errors.ethnic}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.email}
                  error={formikRoot.errors.email && formikRoot.touched.email}
                  helperText={formikRoot.errors.email}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  value={formikRoot.values.phone}
                  name="phone"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.phone && formikRoot.touched.phone}
                  helperText={formikRoot.errors.phone}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} spacing={2}>
              <Grid item container xs={12} spacing={2}>
                <Grid item container xs={3}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                    value={formikRoot.values?.province?.name || null}
                    name="province"
                    onChange={(event) => {
                      formikRoot.setFieldValue("province", { name: event.target.value });
                    }}
                    error={formikRoot.errors.province && formikRoot.errors.province}
                    helperText={formikRoot.errors.province}
                  >
                    {location.provinces.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Quận/Huyện"
                    variant="outlined"
                    value={formikRoot.values?.district?.name || null}
                    name="district"
                    onChange={(event) => {
                      formikRoot.setFieldValue("district", { name: event.target.value });
                    }}
                    error={formikRoot.errors.district && formikRoot.errors.district}
                    helperText={formikRoot.errors.district}
                  >
                    {location.districts.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Xã/Phường"
                    variant="outlined"
                    value={formikRoot.values?.commune?.name || null}
                    name="commune"
                    onChange={(event) => {
                      formikRoot.setFieldValue("commune", { name: event.target.value });
                    }}
                    error={formikRoot.errors.commune && formikRoot.errors.commune}
                    helperText={formikRoot.errors.commune}
                  >
                    {location.communes.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nơi sinh"
                    value={formikRoot.values.birthplace}
                    name="birthplace"
                    onChange={formikRoot.handleChange}
                    error={formikRoot.errors.birthplace && formikRoot.touched.birthplace}
                    helperText={formikRoot.errors.birthplace}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Địa chỉ cụ thể"
                  variant="outlined"
                  value={formikRoot.values.address}
                  name="address"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.address && formikRoot.errors.address}
                  helperText={formikRoot.errors.address}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <CustomAvatar
                formikRoot={formikRoot}
                image={formikRoot.values.image}
                displayButton={""}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={4}>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Mã CCCD"
                variant="outlined"
                name="identityCode"
                onChange={formikRoot.handleChange}
                value={formikRoot.values.identityCode}
                error={formikRoot.errors.identityCode && formikRoot.touched.identityCode}
                helperText={formikRoot.errors.identityCode}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                size="small"
                label="Nơi cấp"
                variant="outlined"
                name="placeIssue"
                onChange={(event) => {
                  formikRoot.setFieldValue("placeIssue", { place: event.target.value });
                }}
                value={formikRoot.values?.placeIssue?.place}
                error={formikRoot.errors.placeIssue && formikRoot.touched.placeIssue}
              >
                {otherFeature.placeIssue.map((item) => (
                  <MenuItem key={item.id} value={item.place}>
                    {item.place}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Ngày cấp"
                variant="outlined"
                value={formikRoot.values.dateIssue || null}
                name="dateIssue"
                onChange={formikRoot.handleChange}
                error={formikRoot.errors.dateIssue && formikRoot.errors.dateIssue}
                helperText={formikRoot.errors.dateIssue}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                size="small"
                label="Nhóm"
                variant="outlined"
                value={formikRoot.values.team}
                name="team"
                onChange={formikRoot.handleChange}
                error={formikRoot.errors.team && formikRoot.errors.team}
                helperText={formikRoot.errors.team}
              >
                {otherFeature.Team.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Lương(VND)"
                variant="outlined"
                name="salary"
                onChange={formikRoot.handleChange}
                value={formikRoot.values.salary}
                error={formikRoot.errors.salary && formikRoot.touched.salary}
                helperText={formikRoot.errors.salary}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                size="small"
                label="Chức vụ"
                variant="outlined"
                value={formikRoot.values.position}
                name="position"
                onChange={formikRoot.handleChange}
                error={formikRoot.errors.position && formikRoot.errors.position}
                helperText={formikRoot.errors.position}
              >
                {otherFeature.Position.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeInfo;
