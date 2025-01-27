import {
  CircleHelpIcon,
  FileIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  SettingsIcon,
  TableIcon,
  UserIcon,
} from "lucide-react";
import { type SidebarData } from "../types";

export const creatorSidebarData: SidebarData = {
  navGroups: [
    {
      title: "Tổng quan",
      items: [
        {
          title: "Trang tổng quan",
          url: "/",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Truyện",
          icon: LibraryBigIcon,
          isActive: true,
          items: [
            { title: "Đã đăng", url: "/books" },
            { title: "Thêm mới", url: "/books/create" },
          ],
        },
        {
          title: "Bản thảo",
          icon: FileIcon,
          url: "/drafts",
        },
      ],
    },
    {
      title: "Khác",
      items: [
        {
          title: "Cài đặt",
          icon: SettingsIcon,
          items: [
            {
              title: "Hồ sơ",
              url: "/settings",
              icon: UserIcon,
            },
          ],
        },
        {
          title: "Trung tâm hỗ trợ",
          url: "/help-center",
          icon: CircleHelpIcon,
        },
      ],
    },
  ],
};

export const adminSidebarData: SidebarData = {
  navGroups: [
    {
      title: "Tổng quan",
      items: [
        {
          title: "Trang tổng quan",
          url: "/admin",
          icon: LayoutDashboardIcon,
        },
      ],
    },
    {
      title: "Nhánh",
      items: [
        {
          title: "Bảng",
          icon: TableIcon,
          items: [
            {
              title: "Thể loại",
              url: "/admin/tables/genres",
            },
            {
              title: "Nhóm thẻ",
              url: "/admin/tables/tag-groups",
            },
            {
              title: "Thẻ",
              url: "/admin/tables/tags",
            },
          ],
        },
      ],
    },
  ],
};
