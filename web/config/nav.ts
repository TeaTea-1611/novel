import {
  ArrowDown10,
  FilePenLine,
  House,
  SquareLibrary,
  CreditCard,
  Gem,
  LibraryBig,
  ScrollText,
  Settings,
  User,
  WalletCards,
  Bell,
  Palette,
  SatelliteDish,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItemWithChildren extends NavItem {
  items: {
    title: string;
    href: string;
  }[];
}

export interface UserNavItem {}

export const mainNav: NavItemWithChildren[] = [
  {
    title: "Trang chủ",
    href: "/",
    icon: House,
    items: [],
  },
  {
    title: "Kho truyện",
    href: "/books",
    icon: SquareLibrary,
    items: [
      { title: "Truyện mới", href: "/books" },
      { title: "Truyện đã hoàn thành", href: "/books" },
    ],
  },
  {
    title: "Bảng xếp hạng",
    href: "/books/ranking/read",
    icon: ArrowDown10,
    items: [
      { title: "Lượt đọc", href: "/books/ranking/read" },
      { title: "Đề cử", href: "/books/ranking/nominate" },
      { title: "Mở khóa", href: "/books/ranking/unlock" },
      { title: "Tặng thưởng", href: "/books/ranking/award" },
      { title: "Bình luận", href: "/books/ranking/comment" },
    ],
  },
  {
    title: "Đăng truyện",
    href: "/creator/books/create",
    icon: FilePenLine,
    items: [
      { title: "Truyện sáng tác", href: "/creator/books/create" },
      { title: "Truyện convert", href: "/creator/books/convert" },
    ],
  },
];

export const userNav: NavItem[][] = [
  [
    { title: "Trang cá nhân", href: "/profile", icon: User },
    { title: "Tủ truyện", href: "/bookcase", icon: LibraryBig },
    { title: "Nhiệm vụ", href: "/missions", icon: ScrollText },
    { title: "Cài đặt", href: "/settings/profile", icon: Settings },
  ],
  [
    {
      title: "Lịch sử giao dịch",
      href: "/transaction-history",
      icon: CreditCard,
    },
    { title: "Nâng cấp", href: "/upgrade", icon: Gem },
    { title: "Nạp", href: "/buy", icon: WalletCards },
  ],
];

export const settingsSidebarNav: NavItem[][] = [
  [
    {
      title: "Hồ sơ công khai",
      href: "/settings/profile",
      icon: User,
    },
    {
      title: "Tùy biến hệ thống",
      href: "/settings/appearance",
      icon: Palette,
    },
    {
      title: "Thông báo",
      href: "/settings/notifications",
      icon: Bell,
    },
  ],
  [
    {
      title: "Mật khẩu và bảo mật",
      href: "/settings/password-and-security",
      icon: Shield,
    },
    {
      title: "Phiên đăng nhập",
      href: "/settings/sessions",
      icon: SatelliteDish,
    },
  ],
];
