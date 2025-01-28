import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();
const email = "phamnam079202038134@gmail.com";
const password = "Tl161102@";

async function main() {
  const hashPassword = await Bun.password.hash(password);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashPassword,
      role: UserRole.ADMIN,
    },
    create: {
      email,
      role: UserRole.ADMIN,
      nickname: "admin",
      emailVerifiedAt: new Date(),
      password: hashPassword,
      notifications: {
        create: {
          enableInteractions: true,
          enableNewChapter: true,
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
        { name: "Điềm Đạm", tagGroupId: 1 },
        { name: "Nhiệt Huyết", tagGroupId: 1 },
        { name: "Vô Sỉ", tagGroupId: 1 },
        { name: "Thiết Huyết", tagGroupId: 1 },
        { name: "Nhẹ Nhàng", tagGroupId: 1 },
        { name: "Cơ Trí", tagGroupId: 1 },
        { name: "Lãnh Khốc", tagGroupId: 1 },
        { name: "Kiêu Ngạo", tagGroupId: 1 },
        { name: "Ngu Ngốc", tagGroupId: 1 },
        { name: "Giảo Hoạt", tagGroupId: 1 },

        { name: "Đông Phương Huyền Huyễn", tagGroupId: 2 },
        { name: "Dị Thế Đại Lục", tagGroupId: 2 },
        { name: "Vương Triều Tranh Bá", tagGroupId: 2 },
        { name: "Cao Võ Thế Giới", tagGroupId: 2 },
        { name: "Tây Phương Kỳ Huyễn", tagGroupId: 2 },
        { name: "Hiện Đại Ma Pháp", tagGroupId: 2 },
        { name: "Hắc Ám Huyễn Tưởng", tagGroupId: 2 },
        { name: "Lịch Sử Thần Thoại", tagGroupId: 2 },
        { name: "Võ Hiệp Huyễn Tưởng", tagGroupId: 2 },
        { name: "Cổ Võ Tương Lai", tagGroupId: 2 },
        { name: "Tu Chân Văn Minh", tagGroupId: 2 },
        { name: "Huyễn Tưởng Tu Tiên", tagGroupId: 2 },
        { name: "Hiện Đại Tu Chân", tagGroupId: 2 },
        { name: "Thần Thoại Tu Chân", tagGroupId: 2 },
        { name: "Cổ Điển Tiên Hiệp", tagGroupId: 2 },
        { name: "Viễn Cổ Hồng Hoang", tagGroupId: 2 },
        { name: "Đô Thị Sinh Hoạt", tagGroupId: 2 },
        { name: "Đô Thị Dị Năng", tagGroupId: 2 },
        { name: "Thanh Xuân Vườn Trường", tagGroupId: 2 },
        { name: "Ngu Nhạc Minh Tinh", tagGroupId: 2 },
        { name: "Thương Chiến Chức Tràng", tagGroupId: 2 },
        { name: "Giá Không Lịch Sử", tagGroupId: 2 },
        { name: "Lịch Sử Quân Sự", tagGroupId: 2 },
        { name: "Dân Gian Truyền Thuyết", tagGroupId: 2 },
        { name: "Lịch Sử Quan Trường", tagGroupId: 2 },
        { name: "Hư Nghĩ Võng Du", tagGroupId: 2 },
        { name: "Du Hí Dị Giới", tagGroupId: 2 },
        { name: "Điện Tử Cạnh Kỹ", tagGroupId: 2 },
        { name: "Thể Dục Cạnh Kỹ", tagGroupId: 2 },
        { name: "Cổ Võ Cơ Giáp", tagGroupId: 2 },
        { name: "Thế Giới Tương Lai", tagGroupId: 2 },
        { name: "Tinh Tế Văn Minh", tagGroupId: 2 },
        { name: "Tiến Hóa Biến Dị", tagGroupId: 2 },
        { name: "Mạt Thế Nguy Cơ", tagGroupId: 2 },
        { name: "Thời Không Xuyên Toa", tagGroupId: 2 },
        { name: "Quỷ Bí Huyền Nghi", tagGroupId: 2 },
        { name: "Kỳ Diệu Thế Giới", tagGroupId: 2 },
        { name: "Trinh Tham Thôi Lý", tagGroupId: 2 },
        { name: "Thám Hiểm Sinh Tồn", tagGroupId: 2 },
        { name: "Cung Vi Trạch Đấu", tagGroupId: 2 },
        { name: "Kinh Thương Chủng Điền", tagGroupId: 2 },
        { name: "Tiên Lữ Kỳ Duyên", tagGroupId: 2 },
        { name: "Hào Môn Thế Gia", tagGroupId: 2 },
        { name: "Dị Tộc Luyến Tình", tagGroupId: 2 },
        { name: "Ma Pháp Huyễn Tình", tagGroupId: 2 },
        { name: "Tinh Tế Luyến Ca", tagGroupId: 2 },
        { name: "Linh Khí Khôi Phục", tagGroupId: 2 },
        { name: "Chư Thiên Vạn Giới", tagGroupId: 2 },
        { name: "Nguyên Sinh Huyễn Tưởng", tagGroupId: 2 },
        { name: "Yêu Đương Thường Ngày", tagGroupId: 2 },
        { name: "Diễn Sinh Đồng Nhân", tagGroupId: 2 },
        { name: "Cáo Tiếu Thổ Tào", tagGroupId: 2 },

        { name: "Hệ Thống", tagGroupId: 3 },
        { name: "Lão Gia", tagGroupId: 3 },
        { name: "Bàn Thờ", tagGroupId: 3 },
        { name: "Tùy Thân", tagGroupId: 3 },
        { name: "Phàm Nhân", tagGroupId: 3 },
        { name: "Vô Địch", tagGroupId: 3 },
        { name: "Xuyên Qua", tagGroupId: 3 },
        { name: "Nữ Cường", tagGroupId: 3 },
        { name: "Khế Ước", tagGroupId: 3 },
        { name: "Trọng Sinh", tagGroupId: 3 },
        { name: "Hồng Lâu", tagGroupId: 3 },
        { name: "Học Viện", tagGroupId: 3 },
        { name: "Biến Thân", tagGroupId: 3 },
        { name: "Cổ Ngu", tagGroupId: 3 },
        { name: "Chuyển Thế", tagGroupId: 3 },
        { name: "Xuyên Sách", tagGroupId: 3 },
        { name: "Đàn Xuyên", tagGroupId: 3 },
        { name: "Phế Tài", tagGroupId: 3 },
        { name: "Dưỡng Thành", tagGroupId: 3 },
        { name: "Cơm Mềm", tagGroupId: 3 },
        { name: "Vô Hạn", tagGroupId: 3 },
        { name: "Mary Sue", tagGroupId: 3 },
        { name: "Cá Mặn", tagGroupId: 3 },
        { name: "Xây Dựng Thế Lực", tagGroupId: 3 },
        { name: "Xuyên Nhanh", tagGroupId: 3 },
        { name: "Nữ Phụ", tagGroupId: 3 },
        { name: "Vả Mặt", tagGroupId: 3 },
        { name: "Sảng Văn", tagGroupId: 3 },
        { name: "Xuyên Không", tagGroupId: 3 },
        { name: "Ngọt Sủng", tagGroupId: 3 },
        { name: "Ngự Thú", tagGroupId: 3 },
        { name: "Điền Viên", tagGroupId: 3 },
        { name: "Toàn Dân", tagGroupId: 3 },
        { name: "Mỹ Thực", tagGroupId: 3 },
        { name: "Phản Phái", tagGroupId: 3 },
        { name: "Sau Màn", tagGroupId: 3 },
        { name: "Thiên Tài", tagGroupId: 3 },
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
