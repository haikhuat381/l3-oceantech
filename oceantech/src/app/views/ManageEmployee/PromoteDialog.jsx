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

function PromoteDialog(props) {

    const { handleClose, handleCloseAll, promoteDataDialog, display } = props;
    const employeeData = useSelector((state) => state.Employee.employeeData);
    console.log("haidata")
    console.log(promoteDataDialog)
    console.log(employeeData)
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var today = new Date();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: promoteDataDialog.id
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
            employeeData.promoteRequest = {...values, "date":promoteDataDialog.date, "oldPosition":promoteDataDialog.oldPosition, "currentPosition":promoteDataDialog.currentPosition};
            employeeData.listPromote.forEach((promote) => {
                if (promote.id === promoteDataDialog.id) {
                  promote.status = "Chờ duyệt"
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
                                <Grid container item sm={12} xs={12} sx={{ display: "flex", justifyContent: "space-between", margin: "0 80px", border: "1px solid #DDDDDD" }}>
                                    <Grid container item sm={5} xs={12} justifyContent="center" sx={{ borderRight: "1px solid #DDDDDD", padding: "10px 0" }}>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h6" textTransform="uppercase" style={{ fontWeight: "bold" }}>
                                                Công ty OceanTech
                                            </Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h7">Số: 10/QĐ- BN</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item sm={7} xs={12} sx={{ padding: "10px 0" }}>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h6" textTransform="uppercase" style={{ fontWeight: "bold" }}>
                                                Cộng hòa xã hội Việt Nam
                                            </Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h7" style={{ fontWeight: "bold" }}>Độc lập - Tự do - Hạnh phúc</Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography>-------------------------------------</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, pt: 2, pb:6 }}
                                    justifyContent="flex-end"
                                >
                                    <Typography>{`Hà Nội, ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`}</Typography>
                                </Grid>
                                <Grid container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h5" style={{ fontWeight: "bold" }}>QUYẾT ĐỊNH</Typography>
                                </Grid>
                                <Grid sx={{ pb: 2 }} container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h6" style={{ fontWeight: "bold" }}>Về việc Thăng chức Cán bộ, Công chức</Typography>
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
                                        <Typography>Căn cứ tại quy chế, điều lệ của Công ty OceanTech</Typography>
                                    </Grid>
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
                                        <Typography>Căn cứ vào hợp đồng lao động với người lao động</Typography>
                                    </Grid>
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
                                        <Typography>Xét những đóng  góp của người lao động và đề nghị của trưởng phòng nhân sự</Typography>
                                    </Grid>
                                </Grid>
                                <Grid sx={{ pt: 4, pb: 2 }} container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h5" style={{ fontWeight: "bold" }}>GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH</Typography>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    className=" container-form"
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                    lineHeight={2}
                                >
                                    <Grid item sm={1.5} xs={12}>
                                        <Typography>Điều 1: Tính từ</Typography>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                    <TextField
                                            size="small"
                                            fullWidth
                                            value={promoteDataDialog.date}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={2.2} xs={12} sx={{ paddingLeft: "15px" }}>
                                        <Typography>, quyết định ông (bà):</Typography>
                                    </Grid>
                                    <Grid item sm={3} xs={12}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={employeeData.fullName}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <Typography>sẽ thăng chức từ:</Typography>
                                    </Grid>
                                    {/* <Grid item sm={0.5} xs={12}>
                                        <Typography>từ:</Typography>
                                    </Grid> */}
                                    <Grid item sm={4} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={promoteDataDialog.oldPosition}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={0.6} xs={12} sx={{ padding: "0 10px" }}>
                                        <Typography>lên</Typography>
                                    </Grid>
                                    <Grid item sm={4} xs={12}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={promoteDataDialog.currentPosition}
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
                                    className=" container-form"
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                    lineHeight={2}
                                >
                                    <Grid item sm={5} xs={12}>
                                        <Typography>Điều 2: Bộ phận nhân sự, phòng kế toán và ông (bà): </Typography>
                                    </Grid>
                                    <Grid item sm={4} xs={12}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={employeeData.fullName}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={2} xs={12} sx={{ paddingLeft: "10px" }}>
                                        <Typography>thi hành thực hiện</Typography>
                                    </Grid>
                                    <Grid item sm={4} xs={12}>
                                        <Typography>quyết định này.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item sm={12} xs={12} sx={{ display: "flex", justifyContent: "space-between", margin: "15px 80px", border: "1px solid #DDDDDD" }}>
                                    <Grid container item sm={5} xs={12} justifyContent="center" sx={{ borderRight: "1px solid #DDDDDD", padding: "10px 30px" }}>
                                        <Grid container item sm={12} xs={12} justifyContent="flex-start">
                                            <Typography variant="h7" style={{ fontWeight: "bold" }}>Nơi nhận:</Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="flex-start">
                                            <Typography variant="h7"> - Như Điều 2</Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="flex-start">
                                            <Typography variant="h7"> - Lưu VP</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item sm={7} xs={12} sx={{ padding: "10px 0" }}>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h6" textTransform="uppercase" style={{ fontWeight: "bold" }}>
                                                GIÁM ĐỐC
                                            </Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography variant="h7">A</Typography>
                                        </Grid>
                                        <Grid container item sm={12} xs={12} justifyContent="center">
                                            <Typography>Nguyễn Văn A</Typography>
                                        </Grid>
                                    </Grid>
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

export default PromoteDialog;
