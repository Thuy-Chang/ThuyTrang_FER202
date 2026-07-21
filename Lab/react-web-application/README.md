# React Web Application - Laptop Store

Project FER202 React: Laptop Product Management.

Giao diện được giữ theo mẫu đã chụp: nền xanh nhạt, navbar xanh, trang Home, Products, About, form Add Product, Product List dạng card, trang Detail và trang Edit.

## Chức năng

- Fetch danh sách laptop từ JSON Server API
- Loading và error state khi API chưa chạy
- Add Product
- Delete Product
- View Details
- Edit Product bằng PUT request
- React Router: Home, Products, About, Product Detail, Edit Product
- Bootstrap + custom CSS
- Dùng ảnh laptop local trong `public/Images`

## Cách chạy đúng

Mở 2 cửa sổ CMD riêng biệt.

### CMD 1: chạy API Server

```bash
cd /d E:\SU26\FER202\Lab\Assignment\react-web-application
npm install
npm run server
```

API chạy tại:

```txt
http://localhost:3001/products
```

### CMD 2: chạy React app

```bash
cd /d E:\SU26\FER202\Lab\Assignment\react-web-application
npm run dev
```

React app chạy tại:

```txt
http://localhost:5173
```

Nếu Vite tự mở port khác như `5178` hoặc `5191`, hãy dùng đúng link được hiển thị trên CMD.

## Lưu ý quan trọng

Không dùng `concurrently` trong project này để tránh lỗi Windows:

```txt
Error: spawn cmd.exe ENOENT
```

Vì vậy hãy chạy API và React bằng 2 cửa sổ CMD riêng.

## Cấu trúc chính

```txt
react-web-application/
├─ db.json
├─ package.json
├─ public/
│  └─ Images/
│     ├─ laptop1.png
│     ├─ laptop2.jpg
│     └─ ...
└─ src/
   ├─ api/productApi.js
   ├─ components/
   ├─ pages/
   ├─ styles/global.css
   ├─ App.jsx
   └─ main.jsx
```

## Git commits gợi ý

```bash
git init
git add .
git commit -m "init react laptop web application"

git add .
git commit -m "add product api and images"

git add .
git commit -m "build home and product list UI"

git add .
git commit -m "implement add delete detail edit product"

git add .
git commit -m "finalize styling and readme"
```
