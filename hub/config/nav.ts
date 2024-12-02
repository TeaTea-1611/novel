import {
  CreditCard,
  Gem,
  LibraryBig,
  ScrollText,
  Settings,
  User,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

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
