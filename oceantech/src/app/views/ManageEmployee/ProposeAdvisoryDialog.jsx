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
    IconButton,
    Icon,
    Typography,
    MenuItem,
    TextareaAutosize,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";

function ProposeAdvisoryDialog(props) {

    const { handleClose, handleCloseAll, proposeDataDialog, display } = props;
    const employeeData = useSelector((state) => state.Employee.employeeData);
    console.log("haidata")
    console.log(proposeDataDialog)
    console.log(employeeData)
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var day = new Date(proposeDataDialog.date);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: proposeDataDialog.id
            // reason: employeeData.promoteRequest?.reason || "",
            // date: employeeData.promoteRequest?.date || "",
        },
        validationSchema: Yup.object({
            // reason: Yup.string().required("Không được bỏ trống"),
            // date: Yup.date().required("Vui lòng nhập ngày"),
        }),
        onSubmit: (values) => {
            console.log("values")
            console.log(values)
            employeeData.proposeRequest = { ...values, "date": proposeDataDialog.date, "content": proposeDataDialog.content, "type": proposeDataDialog.type };
            employeeData.listPropose.forEach((propose) => {
                if (propose.id === proposeDataDialog.id) {
                    propose.status = "Chờ duyệt"
                }
              })
            employeeData.status = "Chờ duyệt";
            employeeData.releaseRequest = null
            dispatch(updateEmployee(employeeData));
            // handleCloseAll();
            handleClose()
            toast.success("Gửi lãnh đạo thành công");
        },
    });
    return (
        <>
            <Dialog open={true} maxWidth={"lg"} fullWidth>
                <DialogTitle
                    sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                >
                    <IconButton onClick={handleClose}>
                        <Icon color="error">close</Icon>
                    </IconButton>
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Grid
                            container
                            spacing={2}
                            style={{
                                fontFamily: '"Times New Roman", Times, serif',
                                padding: 15,
                            }}
                        >
                            <Grid container>
                                <Grid container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h5" textTransform="uppercase" style={{ fontWeight: "bold" }}>
                                        Cộng hòa xã hội Việt Nam
                                    </Typography>
                                </Grid>
                                <Grid container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h6" style={{ fontWeight: "bold" }}>Độc lập - Tự do - Hạnh phúc</Typography>
                                </Grid>
                                <Grid container item sm={12} xs={12} justifyContent="center">
                                    <Typography>-------------------------------------</Typography>
                                </Grid>
                                <Grid sx={{ pt: 6, pb: 6 }} container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h5" style={{ fontWeight: "bold" }}>ĐƠN ĐỀ XUẤT Ý KIẾN THAM MƯU</Typography>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    className=" container-form"
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                >
                                    <Grid item sm={12} xs={12}>
                                        <Typography>Kính gửi: Ban giám đốc công ty OceanTech</Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                    justifyContent="flex-start"
                                >
                                    <Grid item sm={1} xs={12}>
                                        <Typography>Tôi tên là:</Typography>
                                    </Grid>
                                    <Grid item sm={11} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={employeeData.fullName}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                    justifyContent="flex-start"
                                >
                                    <Grid item sm={2.7} xs={12}>
                                        <Typography>Hiện đang công tác tại vị trí:</Typography>
                                    </Grid>
                                    <Grid item sm={9.3} xs={12}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={employeeData.position}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, mt: 1 }}
                                    justifyContent="flex-start"
                                >
                                    <Grid item sm={5.8} xs={12}>
                                        <Typography>Tôi viết đơn này đề nghị Công ty xem xét và giải quyết vấn đề:</Typography>
                                    </Grid>
                                    <Grid item sm={6.2} xs={12}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={proposeDataDialog.type}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, pb: 2, mt: 2 }}
                                    justifyContent="flex-start"
                                >
                                    <Grid item container sm={12} xs={12} spacing={2}>
                                        <Grid item container>
                                            <Grid item xs={12} sx={{pb: 1}}>
                                                <Typography>
                                                Nội dung như sau:
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} item>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                value={proposeDataDialog.content}
                                                variant="standard"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            </Grid>
                                        </Grid>

                                        <Grid item>
                                            <Typography lineHeight={2}>
                                            Kính mong Công ty/ Cá nhân có thẩm quyền xem xét đơn đề nghị và giải quyết vấn đề mà tôi đã nêu ở trên.
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography lineHeight={2}>
                                            Tôi xin cam đoan những thông tin trên hoàn toàn đúng sự thật, nếu có gì sai sót tôi xin chịu trách nhiệm trước Công ty và trước pháp luật.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={12} xs={12} sx={{ mt: 1 }}>
                                        <Typography>Tôi xin chân thành cảm ơn.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, mt: 1 }}
                                    justifyContent="flex-end"
                                ></Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                sm={12}
                                xs={12}
                                sx={{ pl: 10, pr: 10 }}
                                justifyContent="flex-end"
                            >
                                <Grid
                                    item
                                    sm={4}
                                    xs={4}
                                    container
                                    direction="column"
                                    textAlign="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography>{`Hà Nội, ${day.toLocaleDateString(
                                            "vi-VN",
                                            options
                                        )}`}</Typography>
                                        {/* <Typography>{`Hà Nội, ngay ${today.getDate()} thang ${today.getMonth() + 1} nam ${today.getFullYear()}`}</Typography> */}
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ fontWeight: "bold" }}>Người làm đơn</Typography>
                                    </Grid>
                                    <Grid item>
                                        {" "}
                                        <Typography style={{ fontWeight: "bold" }}>
                                            {employeeData.fullName.split(" ").pop()}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ fontWeight: "bold" }}>{employeeData.fullName}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                sm={12}
                                xs={12}
                                sx={{ pl: 10, pr: 10, mt: 3 }}
                                justifyContent="flex-end"
                            >
                                <Grid item sm={3} xs={3}>
                                    <Typography
                                        className="font-15"
                                        style={{ fontWeight: "bold", textDecoration: "uppercase" }}
                                    ></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="button-cancel"
                            variant="contained"
                            sx={{ mb: 2, background: "#FF9E43" }}
                            onClick={handleClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            className="button-confirm1"
                            variant="contained"
                            type="submit"
                            sx={{ mb: 2 }}
                            color="primary"
                        >
                            Trình lãnh đạo
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default ProposeAdvisoryDialog;
