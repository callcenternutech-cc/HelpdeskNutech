import { FiGrid, FiFileText, FiUsers, FiDatabase, FiSettings } from "react-icons/fi";

export const navigationMenu = {
  administrator: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: FiGrid,
    },
    {
      label: "Data Tiket",
      path: "/admin/tickets",
      icon: FiFileText,
    },
    {
      label: "Manajemen User",
      path: "/admin/users",
      icon: FiUsers,
    },
    {
      label: "Master Data",
      path: "/admin/master",
      icon: FiDatabase,
    },
    {
      label: "Pengaturan",
      path: "/settings",
      icon: FiSettings,
    },
  ],

  staff: [
    {
      label: "Dashboard",
      path: "/staff/dashboard",
      icon: FiGrid,
    },
    {
      label: "Data Tiket",
      path: "/staff/tickets",
      icon: FiFileText,
    },
    { label: "Pengaturan", path: "/settings", icon: FiSettings },
  ],

  user: [
    {
      label: "Dashboard",
      path: "/user/dashboard",
      icon: FiGrid,
    },
    {
      label: "Data Tiket",
      path: "/user/tickets",
      icon: FiFileText,
    },
    { label: "Pengaturan", path: "/settings", icon: FiSettings },
  ],

  executive: [
    {
      label: "Dashboard",
      path: "/executive/dashboard",
      icon: FiGrid,
    },
    {
      label: "Data Tiket",
      path: "/executive/tickets",
      icon: FiFileText,
    },
    { label: "Pengaturan", path: "/settings", icon: FiSettings },
  ],

  engineer: [
    {
      label: "Dashboard",
      path: "/engineer/dashboard",
      icon: FiGrid,
    },
    {
      label: "Data Tiket",
      path: "/engineer/tickets",
      icon: FiFileText,
    },
    { label: "Pengaturan", path: "/settings", icon: FiSettings },
  ],
};
