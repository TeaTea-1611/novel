import { PrismaClient, UserRole } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();
const email = "phamnam079202038134@gmail.com";
const password = "Tl161102@";

async function main() {
  const hashPassword = await argon2.hash(password);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      role: UserRole.ADMIN,
      nickname: "admin",
      emailVerified: new Date(),
      password: hashPassword,
      notificationSettings: {
        create: {
          newChapter: true,
          newInteraction: true,
        },
      },
    },
  });

  try {
    await prisma.genre.createMany({
      data: [
        "Tiên Hiệp",
        "Huyền Huyễn",
        "Khoa Huyễn",
        "Võng Du",
        "Đô Thị",
        "Đồng Nhân",
        "Dã Sử",
        "Cạnh Kỹ",
        "Huyền Nghi",
        "Kiếm Hiệp",
        "Kỳ Ảo",
        "Light Novel",
      ].map((genre) => ({ name: genre })),
    });
  } catch {}

  try {
    await prisma.tagGroup.createMany({
      data: [
        {
          id: 1,
          name: "Tính cách nhân vật chính",
          color: "#6366f1",
        },
        {
          id: 2,
          name: "Bối cảnh thế giới",
          color: "#8b5cf6",
        },
        { id: 3, name: "Lưu phái", color: "#a855f7" },
      ],
    });
  } catch {}

  try {
    await prisma.tag.createMany({
      data: [
        { name: "Điềm Đạm", groupId: 1 },
        { name: "Nhiệt Huyết", groupId: 1 },
        { name: "Vô Sỉ", groupId: 1 },
        { name: "Thiết Huyết", groupId: 1 },
        { name: "Nhẹ Nhàng", groupId: 1 },
        { name: "Cơ Trí", groupId: 1 },
        { name: "Lãnh Khốc", groupId: 1 },
        { name: "Kiêu Ngạo", groupId: 1 },
        { name: "Ngu Ngốc", groupId: 1 },
        { name: "Giảo Hoạt", groupId: 1 },

        { name: "Đông Phương Huyền Huyễn", groupId: 2 },
        { name: "Dị Thế Đại Lục", groupId: 2 },
        { name: "Vương Triều Tranh Bá", groupId: 2 },
        { name: "Cao Võ Thế Giới", groupId: 2 },
        { name: "Tây Phương Kỳ Huyễn", groupId: 2 },
        { name: "Hiện Đại Ma Pháp", groupId: 2 },
        { name: "Hắc Ám Huyễn Tưởng", groupId: 2 },
        { name: "Lịch Sử Thần Thoại", groupId: 2 },
        { name: "Võ Hiệp Huyễn Tưởng", groupId: 2 },
        { name: "Cổ Võ Tương Lai", groupId: 2 },
        { name: "Tu Chân Văn Minh", groupId: 2 },
        { name: "Huyễn Tưởng Tu Tiên", groupId: 2 },
        { name: "Hiện Đại Tu Chân", groupId: 2 },
        { name: "Thần Thoại Tu Chân", groupId: 2 },
        { name: "Cổ Điển Tiên Hiệp", groupId: 2 },
        { name: "Viễn Cổ Hồng Hoang", groupId: 2 },
        { name: "Đô Thị Sinh Hoạt", groupId: 2 },
        { name: "Đô Thị Dị Năng", groupId: 2 },
        { name: "Thanh Xuân Vườn Trường", groupId: 2 },
        { name: "Ngu Nhạc Minh Tinh", groupId: 2 },
        { name: "Thương Chiến Chức Tràng", groupId: 2 },
        { name: "Giá Không Lịch Sử", groupId: 2 },
        { name: "Lịch Sử Quân Sự", groupId: 2 },
        { name: "Dân Gian Truyền Thuyết", groupId: 2 },
        { name: "Lịch Sử Quan Trường", groupId: 2 },
        { name: "Hư Nghĩ Võng Du", groupId: 2 },
        { name: "Du Hí Dị Giới", groupId: 2 },
        { name: "Điện Tử Cạnh Kỹ", groupId: 2 },
        { name: "Thể Dục Cạnh Kỹ", groupId: 2 },
        { name: "Cổ Võ Cơ Giáp", groupId: 2 },
        { name: "Thế Giới Tương Lai", groupId: 2 },
        { name: "Tinh Tế Văn Minh", groupId: 2 },
        { name: "Tiến Hóa Biến Dị", groupId: 2 },
        { name: "Mạt Thế Nguy Cơ", groupId: 2 },
        { name: "Thời Không Xuyên Toa", groupId: 2 },
        { name: "Quỷ Bí Huyền Nghi", groupId: 2 },
        { name: "Kỳ Diệu Thế Giới", groupId: 2 },
        { name: "Trinh Tham Thôi Lý", groupId: 2 },
        { name: "Thám Hiểm Sinh Tồn", groupId: 2 },
        { name: "Cung Vi Trạch Đấu", groupId: 2 },
        { name: "Kinh Thương Chủng Điền", groupId: 2 },
        { name: "Tiên Lữ Kỳ Duyên", groupId: 2 },
        { name: "Hào Môn Thế Gia", groupId: 2 },
        { name: "Dị Tộc Luyến Tình", groupId: 2 },
        { name: "Ma Pháp Huyễn Tình", groupId: 2 },
        { name: "Tinh Tế Luyến Ca", groupId: 2 },
        { name: "Linh Khí Khôi Phục", groupId: 2 },
        { name: "Chư Thiên Vạn Giới", groupId: 2 },
        { name: "Nguyên Sinh Huyễn Tưởng", groupId: 2 },
        { name: "Yêu Đương Thường Ngày", groupId: 2 },
        { name: "Diễn Sinh Đồng Nhân", groupId: 2 },
        { name: "Cáo Tiếu Thổ Tào", groupId: 2 },

        { name: "Hệ Thống", groupId: 3 },
        { name: "Lão Gia", groupId: 3 },
        { name: "Bàn Thờ", groupId: 3 },
        { name: "Tùy Thân", groupId: 3 },
        { name: "Phàm Nhân", groupId: 3 },
        { name: "Vô Địch", groupId: 3 },
        { name: "Xuyên Qua", groupId: 3 },
        { name: "Nữ Cường", groupId: 3 },
        { name: "Khế Ước", groupId: 3 },
        { name: "Trọng Sinh", groupId: 3 },
        { name: "Hồng Lâu", groupId: 3 },
        { name: "Học Viện", groupId: 3 },
        { name: "Biến Thân", groupId: 3 },
        { name: "Cổ Ngu", groupId: 3 },
        { name: "Chuyển Thế", groupId: 3 },
        { name: "Xuyên Sách", groupId: 3 },
        { name: "Đàn Xuyên", groupId: 3 },
        { name: "Phế Tài", groupId: 3 },
        { name: "Dưỡng Thành", groupId: 3 },
        { name: "Cơm Mềm", groupId: 3 },
        { name: "Vô Hạn", groupId: 3 },
        { name: "Mary Sue", groupId: 3 },
        { name: "Cá Mặn", groupId: 3 },
        { name: "Xây Dựng Thế Lực", groupId: 3 },
        { name: "Xuyên Nhanh", groupId: 3 },
        { name: "Nữ Phụ", groupId: 3 },
        { name: "Vả Mặt", groupId: 3 },
        { name: "Sảng Văn", groupId: 3 },
        { name: "Xuyên Không", groupId: 3 },
        { name: "Ngọt Sủng", groupId: 3 },
        { name: "Ngự Thú", groupId: 3 },
        { name: "Điền Viên", groupId: 3 },
        { name: "Toàn Dân", groupId: 3 },
        { name: "Mỹ Thực", groupId: 3 },
        { name: "Phản Phái", groupId: 3 },
        { name: "Sau Màn", groupId: 3 },
        { name: "Thiên Tài", groupId: 3 },
      ],
    });
  } catch {}
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
