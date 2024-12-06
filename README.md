# Ứng Dụng Đọc Truyện/ Tiểu Thuyết

Ứng dụng đọc truyện/tiểu thuyết mạng mang đến trải nghiệm đọc truyện tuyệt vời với kho nội dung phong phú, giao diện thân thiện và nhiều tính năng tiện ích.

## 🚀 Tính năng nổi bật

- **Kho truyện phong phú**: Hàng nghìn tiểu thuyết với đa dạng thể loại như ngôn tình, tiên hiệp, huyền huyễn, trinh thám, kinh dị,...
- **Đọc ngoại tuyến**: Tải truyện về máy và đọc mọi lúc mọi nơi.
- **Cá nhân hóa**:
  - Lưu truyện yêu thích.
  - Lịch sử đọc.
  - Gợi ý truyện dựa trên sở thích cá nhân.
- **Tùy chỉnh giao diện đọc**:
  - Chế độ tối (Dark Mode).
  - Thay đổi font chữ, kích thước chữ và màu nền.
- **Tương tác cộng đồng**: Đánh giá, bình luận và chia sẻ cảm nhận về các truyện.
- **Thông báo cập nhật chương mới**.

## 🛠️ Công nghệ sử dụng

- **Frontend**: [React.js](https://reactjs.org/) / [Next.js](https://nextjs.org/)
- **Backend**: [Node.js](https://nodejs.org/) / [Apollo Server](https://www.apollographql.com/docs/apollo-server/) / [TypeGraphQL](https://typegraphql.com/)
- **Cơ sở dữ liệu**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **API**: GraphQL
- **Caching**: [Redis](https://redis.io/)
- **Authentication**: JWT + Refresh Tokens

## 🗂️ Cấu trúc thư mục

```plaintext
app/
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── emails/
│   │   ├── genrerated/type-graphql
│   │   └── modules/
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── web/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
├── hub/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
```
