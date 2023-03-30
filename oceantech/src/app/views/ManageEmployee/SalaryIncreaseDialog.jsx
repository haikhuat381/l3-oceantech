import React, { useState } from "react";
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
import { BorderColor, Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";

function SalaryIncreaseDialog(props) {
    // const [shouldOpenSalaryIncreaseDialog, setShouldOpenSalaryIncreaseDialog] = useState(false);

    const { handleClose, handleCloseAll, display, dataIncrease } = props;
    const employeeData = useSelector((state) => state.Employee.employeeData);
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var today = new Date();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: dataIncrease.id,
            date: employeeData.increaseRequest?.date || "",
            organize: employeeData.increaseRequest?.organize || "",
            company: employeeData.increaseRequest?.company || "",
            rule: employeeData.increaseRequest?.rule || "",
            rank: employeeData.increaseRequest?.rank || "",
            Number: employeeData.increaseRequest?.Number || "",
        },
        validationSchema: Yup.object({
            //date: Yup.date().required("Vui lòng nhập ngày"),
            //    organize: Yup.organize().required("Vui lòng nhập ngày"),
            //    company: Yup.company().required("Vui lòng nhập ngày"),
            //    rule: Yup.rule().required("Vui lòng nhập ngày"),
            //    Number: Yup.Number().required("Vui lòng nhập ngày"),
            //    rank: Yup.rank().required("Vui lòng nhập ngày"),

        }),
        onSubmit: (values) => {
            console.log('ttttt');
            employeeData.increaseRequest = { ...values, "rank": dataIncrease.rank, "date": dataIncrease.date, "organize": formik.values.organize, "company": formik.values.company, "rule": formik.values.rule, "Number": formik.values.Number }
            // employeeData.releaseRequest = values;
            employeeData.listIncreaseSalary.forEach((SalaryIncreaseItem) => {
                if (SalaryIncreaseItem.id == dataIncrease.id) {
                    SalaryIncreaseItem.status = "Chờ duyệt"
                }
            }
            )
            employeeData.status = "Chờ duyệt";
            dispatch(updateEmployee(employeeData));
            handleCloseAll();
            handleClose()
            toast.success("Gửi lãnh đạo thành công");
        },
    });
    return (

        <>
            <Dialog open={true} maxWidth={"lg"} fullWidth>
                <DialogTitle
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
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
                                <Grid sx={{ border: 1, BorderColor: 'grey.500' }} container item sm={12} xs={12} justifyContent="center" display="flex" >
                                    <Grid container item sm={5} xs={5} justifyContent="center" display="flex" sx={{ pt: 2, pb: 2, pl: 2, pr: 2, borderRight: 1, BorderColor: 'grey.500' }}>
                                        <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                                            <Grid sm={5} xs={5} sx={{ mt: 2 }}>
                                                <Typography variant="h5" sm={12} xs={12} value={formik.values.organize}>CƠ QUAN:</Typography>
                                            </Grid>
                                            <TextField
                                                fullWidth
                                                // multiline
                                                sm={7} xs={7}
                                                variant="standard"
                                                name="organize"
                                                value={formik.values.organize}
                                                onChange={formik.handleChange}
                                                error={formik.errors.organize && formik.touched.organize}
                                                helperText={formik.errors.organize}
                                            />
                                        </Grid>

                                        <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                                            <Grid sx={{ mt: 2 }} sm={5} xs={5}>
                                                <Typography variant="h6" sm={12} xs={12} >CÔNG TY:</Typography>
                                            </Grid>
                                            <TextField

                                                fullWidth
                                                // multiline
                                                sm={7} xs={7}
                                                variant="standard"
                                                name="company"
                                                value={formik.values.company}
                                                onChange={formik.handleChange}
                                                error={formik.errors.company && formik.touched.company}
                                                helperText={formik.errors.company}
                                            />
                                        </Grid>

                                        <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                                            <Grid sx={{ mt: 2 }} sm={5} xs={5}>
                                                <Typography variant="h6" sm={12} xs={12}>Số:</Typography>
                                            </Grid>
                                            <TextField
                                                fullWidth
                                                // multiline
                                                sm={7} xs={7}
                                                variant="standard"
                                                name="Number"
                                                value={formik.values.Number}
                                                onChange={formik.handleChange}
                                                error={formik.errors.Number && formik.touched.Number}
                                                helperText={formik.errors.Number}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item sm={7} xs={7} sx={{ pt: 2, pb: 2 }}>
                                        <Grid variant="h5" textTransform="uppercase" sm={12} xs={12} fullWidth textAlign="center" >
                                            <Typography variant="h5" sm={12} xs={12} sx={{ fontWeight: 'bold' }}>Cộng hòa xã hội Việt Nam</Typography>
                                        </Grid>
                                        <Grid variant="h6" sm={12} xs={12} fullWidth textAlign="center" >
                                            <Typography variant="h6" sm={12} xs={12} sx={{ fontWeight: "bold" }}>Độc lập - Tự do - Hạnh phúc</Typography>
                                        </Grid>
                                        <Grid sm={12} xs={12} fullWidth textAlign="center" >
                                            <Typography variant="h6" sm={12} xs={12}>-------------------------------------</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid sx={{ pt: 1, mt: 4 }} container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }} sm={12} xs={12}>QUYẾT ĐỊNH</Typography>
                                </Grid>
                                <Grid sx={{ pt: 1, pb: 1 }} container item sm={12} xs={12} justifyContent="center">
                                    <Typography variant="h6" sm={12} xs={12}>Về việc điều chỉnh tăng lương cho Nhân viên</Typography>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    className=" container-form"
                                    sx={{ pl: 10, pr: 10, pb: 2 }}
                                >
                                    <Grid sx={{ mb: 2 }} item sm={3.75} xs={3.75}>
                                        <Typography sx={{ mt: 1 }} xs={2} sm={3}>- Căn cứ tại quy chế, Điều lệ công ty:</Typography>
                                    </Grid>
                                    <Grid xs={8} item>
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="standard"
                                            name="rule"
                                            value={formik.values.rule}
                                            onChange={formik.handleChange}
                                            error={formik.errors.rule && formik.touched.rule}
                                            helperText={formik.errors.rule}
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        <Typography sx={{ mb: 2 }}>- Căn cứ vào hợp đồng lao động với người lao động</Typography>
                                        <Typography>- Xét những đóng  góp của người lao động và đề nghị của trưởng phòng nhân sự</Typography>
                                    </Grid>
                                    <Grid sx={{ pt: 1, mt: 4 }} container item sm={12} xs={12} justifyContent="center">
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH</Typography>

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
                                    <Grid item sm={2} xs={2} sx={{ mt: 1 }}>
                                        <Typography>Điều 1: Kể từ ngày</Typography>
                                    </Grid>
                                    <Grid item sm={2} xs={2}>
                                        <TextField
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            textAlign="center"
                                            name="date"
                                            value={dataIncrease.date}
                                        />
                                    </Grid>
                                    <Grid item sm={3.5} xs={3.5} sx={{ pl: 1, mt: 1 }}>
                                        <Typography>điều chỉnh mức lương của Ông/Bà</Typography>
                                    </Grid>
                                    <Grid item sm={2} xs={2}>
                                        <TextField
                                            textAlign="center"
                                            fullWidth
                                            value={employeeData.fullName}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={1} xs={1} sx={{ mt: 1 }}>
                                        <Typography>sẽ là bậc</Typography>
                                    </Grid>
                                    <Grid item sm={1} xs={1}>
                                        <TextField
                                            textAlign="center"
                                            fullWidth
                                            value={dataIncrease.rank}
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
                                    <Typography>Điều 2: Các ông/bà Phòng Nhân Sự, Phòng Tài Chính kế toán căn cứ quyết định thi hành</Typography>
                                </Grid>
                                {/* <Grid
                                    container
                                    item
                                    sm={12}
                                    xs={12}
                                    sx={{ pl: 10, pr: 10, mt: 1 }}
                                    justifyContent="flex-end"
                                ></Grid> */}
                            </Grid>
                            <Grid
                                container
                                sm={12}
                                xs={12}
                                sx={{ mt: 4, border: 1, BorderColor: 'grey.500' }}
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                            >
                                <Grid
                                    item
                                    sm={6}
                                    xs={6}
                                    sx={{ pl: 10, pr: 10, borderRight: 1, BorderColor: 'grey.500' }}
                                >
                                    <Grid
                                        item
                                        sm={12}
                                        xs={12}
                                        container
                                        direction="column"
                                        textAlign="center"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Typography style={{ fontWeight: "bold" }}>Nơi nhận đơn</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontWeight: "bold" }}>TỔNG GIÁM ĐỐC</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontWeight: "bold" }}>Như điều 2</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontWeight: "bold" }}>Lưu HS, HC</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    sm={6}
                                    xs={6}
                                    sx={{ pl: 10, pr: 10 }}
                                >
                                    <Grid
                                        item
                                        sm={12}
                                        xs={12}
                                        container
                                        direction="column"
                                        textAlign="center"
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Typography>{`Hà Nội, ${today.toLocaleDateString(
                                                "vi-VN",
                                                options
                                            )}`}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontWeight: "bold" }}>Người làm đơn 2</Typography>
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
                                {/* =================================== */}

                            </Grid>
                            {/* <Grid
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
                            </Grid> */}
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
                {/* {shouldOpenSalaryIncreaseDialog && (
                    <SalaryIncreaseDialog
                        handleClose={() => setShouldOpenSalaryIncreaseDialog(false)}
                        handleCloseAll={handleClose}
                    />
                )} */}
            </Dialog>
        </>
    );
}

export default SalaryIncreaseDialog;
