# Novel

## Giới thiệu

Novel là một dự án đa nền tảng bao gồm ứng dụng di động, web và máy chủ. Mỗi phần được tổ chức trong các thư mục riêng biệt để dễ dàng quản lý và phát triển.

## Cách chạy dự án

### 1. Cài đặt

```bash
pnpm install
```

### 2. Chạy từng ứng dụng

mobile:

```bash
cd apps/mobile
npm start
```

server:

- run redis-server `sudo service redis-server start` or REDIS_URL
- generate prisma

```bash
cd apps/server
bun dev
```

web:

```bash
cd apps/web
pnpm dev
```
