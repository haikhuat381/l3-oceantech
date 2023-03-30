export const navigations = [
  { label: "Trang chủ", type: "label" },
  {
    name: "Lãnh đạo",
    icon: "collections_bookmark",
    children: [
      { name: "Chờ duyệt", path: "/approval", icon: "cached" },
      { name: "Đã duyệt", path: "/approved", icon: "published_with_changes" },
    ],
  },

  {
    name: "Quản lý",
    icon: "group",
    children: [
      { name: "Thêm mới nhân viên", path: "/addnew_employee", icon: "person_add_alt_1" },
      { name: "Quản lý nhân viên", path: "/manage_employee", icon: "manage_accounts" },
      { name: "Kết thúc", path: "/release", icon: "person_off" },
      { name: "Nội dung liên quan", path: "/related_info", icon: "sensor_occupied" },
    ],
  },
];
