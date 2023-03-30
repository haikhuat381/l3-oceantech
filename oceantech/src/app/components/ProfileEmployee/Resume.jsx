import React, { useState } from "react";
import { Icon, TextField, IconButton } from "@mui/material";
import { Grid, Typography, Box, Input, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";

import CustomAvatar from "../Avatar/Avatar";
const Resume = React.forwardRef((props, ref) => {
  const MyButton = styled(IconButton)({
    display: props.display,
  });
  const { employee, status } = props;
  const [textFieldValues, setTextFieldValues] = useState({
    education: employee.education,
    experience: employee.experience,
    skill: employee.skill,
    hobby: employee.hobby,
    generalIntroduction: employee.generalIntroduction,
    careerGoals: employee.careerGoals,
  });
  const handleAddTextField = (method) => {
    const newValues = { ...textFieldValues };
    newValues[method].push("");
    setTextFieldValues(newValues);
  };

  const handleRemoveTextField = (index, method) => () => {
    const newValues = { ...textFieldValues };
    newValues[method].splice(index, 1);
    setTextFieldValues(newValues);
  };

  const handleTextFieldChange = (event, index, method) => {
    const newValues = { ...textFieldValues };
    newValues[method][index] = event.target.value;
    console.log(newValues);
    setTextFieldValues(newValues);
  };

  return (
    <div ref={ref}>
      <Grid container className="resume-container" xs={12} spacing={2}>
        <Grid container direction={"column"} xs={4} rowSpacing={2} className="resume-left">
          <Grid item>
            <CustomAvatar image={employee.image} displayButton={"none"} />
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign={"center"} textTransform={"uppercase"}>
              {employee.fullName}
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              {employee.team}
            </Typography>
          </Grid>

          <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item>
              <Box className="title-info">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Thông tin cơ bản
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>cakeIcon</Icon>
                <Typography variant="body2">
                  {employee.birthday.split("-").reverse().join("-")}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>transgender</Icon>
                <Typography variant="body2">{employee.gender}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>location_on</Icon>
                <Typography variant="body2">{employee.address}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>phone</Icon>
                <Typography variant="body2">{employee.phone}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>email</Icon>
                <Typography variant="body2">{employee.email}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item>
              <Box className="title-skill">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Kĩ Năng
                </Typography>
                <MyButton onClick={() => handleAddTextField("skill")}>
                  <Icon sx={{ fontSize: "28px", color: "#fff" }} className={"add-button"}>
                    control_point
                  </Icon>
                </MyButton>
              </Box>
            </Grid>
            <Grid item className="textfield-box" m={"0 24px"}>
              {textFieldValues.skill.map((value, index) => (
                <div style={{ display: "flex", alignItems: "center" }} key={index}>
                  <TextField
                    value={value}
                    fullWidth
                    focused
                    multiline
                    InputProps={{ inputProps: { style: { color: "#fff" } }, readOnly: status }}
                    variant="standard"
                    name="skill"
                    onChange={(event) => {
                      handleTextFieldChange(event, index, "skill");
                    }}
                  />

                  <MyButton onClick={handleRemoveTextField(index, "skill")} s>
                    <Icon sx={{ color: "#ddd" }} className={"remove-button"}>
                      remove_circle_outline
                    </Icon>
                  </MyButton>
                </div>
              ))}
            </Grid>
          </Grid>
          <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item>
              <Box className="title-hobby">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Sở Thích
                </Typography>
                <MyButton onClick={() => handleAddTextField("hobby")}>
                  <Icon sx={{ fontSize: "28px", color: "#fff" }} className={"add-button"}>
                    control_point
                  </Icon>
                </MyButton>
              </Box>
            </Grid>
            <Grid item className="textfield-box" m={"0 24px"}>
              {textFieldValues.hobby.map((value, index) => (
                <div style={{ display: "flex", alignItems: "center" }} key={index}>
                  <TextField
                    value={value}
                    fullWidth
                    multiline
                    focused
                    InputProps={{ inputProps: { style: { color: "#fff" } }, readOnly: status }}
                    variant="standard"
                    name="hobby"
                    onChange={(event) => {
                      handleTextFieldChange(event, index, "hobby");
                    }}
                  />

                  <MyButton onClick={handleRemoveTextField(index, "hobby")}>
                    <Icon sx={{ color: "#ddd" }} className={"remove-button"}>
                      remove_circle_outline
                    </Icon>
                  </MyButton>
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={8} className="resume-right" direction={"column"} spacing={4}>
          <Grid item display={"flex"} gap={1} alignItems="center">
            <Icon sx={{ fontSize: "28px" }}>account_circle</Icon>
            <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
              Giới thiệu chung
            </Typography>
          </Grid>
          <Grid item>
            {textFieldValues.generalIntroduction.map((value, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <TextField
                  value={value}
                  fullWidth
                  multiline
                  InputProps={{ readOnly: status }}
                  variant="standard"
                  name="generalIntroduction"
                  onChange={(event) => {
                    handleTextFieldChange(event, index, "generalIntroduction");
                  }}
                />
              </div>
            ))}
          </Grid>
          <Grid item display={"flex"} justifyContent="space-between">
            <Box display={"flex"} gap={1} alignItems="center">
              <Icon sx={{ fontSize: "28px" }}>school</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
                Học vấn
              </Typography>
            </Box>
            <MyButton onClick={() => handleAddTextField("education")}>
              <Icon sx={{ fontSize: "28px" }} className={"add-button"}>
                control_point
              </Icon>
            </MyButton>
          </Grid>
          <Grid item>
            {textFieldValues.education.map((value, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <TextField
                  value={value}
                  fullWidth
                  InputProps={{ readOnly: status }}
                  multiline
                  variant="standard"
                  name="education"
                  // onChange={(event) => {
                  //   handleTextFieldChange(index, "education");
                  //   textFieldValues.education[index] = event.target.value;
                  //   // formikRoot.setFieldValue("education", textFieldValues.education);
                  // }}
                  onChange={(event) => {
                    handleTextFieldChange(event, index, "education");
                  }}
                />

                <MyButton onClick={handleRemoveTextField(index, "education")}>
                  <Icon className={"remove-button"}>remove_circle_outline</Icon>
                </MyButton>
              </div>
            ))}
          </Grid>

          <Grid item display={"flex"} justifyContent="space-between">
            <Box display={"flex"} gap={1} alignItems="center">
              <Icon sx={{ fontSize: "28px" }}>business_center</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
                Kinh nghiệm làm việc
              </Typography>
            </Box>
            <MyButton
              onClick={() => {
                handleAddTextField("experience");
              }}
            >
              <Icon sx={{ fontSize: "28px" }} className={"add-button"}>
                control_point
              </Icon>
            </MyButton>
          </Grid>
          <Grid item>
            {textFieldValues.experience.map((value, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <TextField
                  value={value}
                  fullWidth
                  multiline
                  name="experience"
                  variant="standard"
                  InputProps={{ readOnly: status }}
                  onChange={(event) => {
                    handleTextFieldChange(event, index, "experience");
                  }}
                />

                <MyButton onClick={handleRemoveTextField(index, "experience")}>
                  <Icon className={"remove-button"}>remove_circle_outline</Icon>
                </MyButton>
              </div>
            ))}
          </Grid>
          <Grid item display={"flex"} gap={1} alignItems="center">
            <Icon sx={{ fontSize: "28px" }}>create</Icon>
            <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
              Mục tiêu nghề nghiệp
            </Typography>
          </Grid>
          <Grid item>
            {textFieldValues.careerGoals.map((value, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <TextField
                  value={value}
                  fullWidth
                  multiline
                  InputProps={{ readOnly: status }}
                  variant="standard"
                  name="careerGoals"
                  onChange={(event) => {
                    handleTextFieldChange(event, index, "careerGoals");
                  }}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});
export default Resume;
