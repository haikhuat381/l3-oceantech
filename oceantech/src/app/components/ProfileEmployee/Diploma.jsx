import React from "react";
import { useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import { Tooltip, Icon, IconButton } from "@mui/material";
const Diploma = React.forwardRef((props, ref) => {
  const employeeData = useSelector((state) => state.Employee.employeeData);
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
    <div ref={ref}>
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
    </div>
  );
});

export default Diploma;
