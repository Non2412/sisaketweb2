# การเชื่อมต่อ Frontend กับ Backend API

## 📋 ขั้นตอนการตั้งค่า

### 1. เริ่มต้น Backend API

```bash
cd path/to/sisaket_charity_api
npm install
npm start
```

Backend จะรันที่ `http://localhost:3001`

### 2. ตรวจสอบ Environment Variables

แก้ไขไฟล์ `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. เริ่มต้น Frontend

```bash
npm run dev
```

Frontend จะรันที่ `http://localhost:3000`

## 🔌 API Endpoints ที่พร้อมใช้งาน

### Orders API
- `POST /api/orders` - สร้างออเดอร์ใหม่
- `GET /api/orders` - ดึงข้อมูลออเดอร์ทั้งหมด
- `GET /api/orders/:id` - ดึงข้อมูลออเดอร์ตาม ID
- `PUT /api/orders/:id` - อัพเดทข้อมูลออเดอร์
- `DELETE /api/orders/:id` - ยกเลิกออเดอร์

### Users API
- `POST /api/users` - สร้าง/อัพเดท user จาก Google login
- `GET /api/users` - ดึงข้อมูล users ทั้งหมด
- `GET /api/users/:id` - ดึงข้อมูล user ตาม ID

### Products API
- `GET /api/products` - ดึงข้อมูลสินค้าทั้งหมด
- `GET /api/products/:id` - ดึงข้อมูลสินค้าตาม ID

### Settings API
- `GET /api/settings/shipping_config` - ดึงค่าจัดส่ง
- `GET /api/settings/payment_methods` - ดึงช่องทางการชำระเงิน
- `GET /api/settings/event_info` - ดึงข้อมูลงาน

### Statistics API
- `GET /api/statistics/summary` - สถิติรวม
- `GET /api/statistics/daily` - สถิติรายวัน
- `GET /api/statistics/top-products` - สินค้าขายดี
- `GET /api/statistics/sizes` - สถิติตามไซส์

## 💡 ตัวอย่างการใช้งาน

### สร้างออเดอร์ใหม่

```typescript
import { createOrder } from '@/lib/api/backend';

const orderData = {
  customer: {
    name: 'สมชาย ใจดี',
    phone: '0812345678',
    email: 'somchai@email.com',
    address: {
      fullAddress: '123 ถ.มิตรภาพ จ.ศรีสะเกษ 33000'
    }
  },
  items: [{
    productId: 'product_id_here',
    productName: 'เสื้อเฉลิมฉลองเมือง 243 ปี',
    size: 'L',
    quantity: 2,
    pricePerUnit: 299,
    subtotal: 598
  }],
  pricing: {
    subtotal: 598,
    shippingFee: 60,
    discount: 0,
    total: 658
  },
  shipping: {
    method: 'standard',
    firstItemFee: 50,
    additionalItemFee: 10,
    totalItems: 2
  },
  payment: {
    method: 'promptpay',
    status: 'pending'
  },
  notes: 'ขอส่งเร็วด้วยครับ'
};

const response = await createOrder(orderData);
console.log(response);
```

### Sync Google User

```typescript
import { syncGoogleUser } from '@/lib/api/users';

const userData = {
  googleId: session.user.id,
  email: session.user.email,
  name: session.user.name,
  picture: session.user.image
};

const response = await syncGoogleUser(userData);
```

### ดึงสถิติ Dashboard

```typescript
import { getStatisticsSummary } from '@/lib/api/statistics';

const stats = await getStatisticsSummary();
console.log(stats.data);
// {
//   totalProducts: 1,
//   totalOrders: 10,
//   totalCustomers: 5,
//   totalRevenue: 5000,
//   totalItems: 20
// }
```

## 🔧 การแก้ไข CORS (ถ้ามีปัญหา)

ในไฟล์ `sisaket_charity_api/server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

## 🚨 Troubleshooting

### ไม่สามารถเชื่อมต่อ API ได้

1. ตรวจสอบว่า Backend API รันอยู่ที่ port 3001
2. ตรวจสอบ `NEXT_PUBLIC_API_URL` ใน `.env.local`
3. เปิด Browser Console เช็ค error messages
4. ตรวจสอบ CORS settings

### CORS Error

แก้ไข `server.js` ใน backend ให้เพิ่ม frontend URL:

```javascript
origin: ['http://localhost:3000']
```

### Port Conflict

ถ้า port 3001 ถูกใช้งานอยู่:

```bash
# ใน backend
PORT=3002 npm start
```

แล้วแก้ `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

## 📚 ไฟล์ที่สร้างขึ้น

- `src/lib/api/client.ts` - API Client หลัก
- `src/lib/api/backend.ts` - Orders & Settings API
- `src/lib/api/users.ts` - Users API
- `src/lib/api/products.ts` - Products API
- `src/lib/api/statistics.ts` - Statistics API
- `src/types/order.ts` - Types เพิ่มเติม

## ✅ Next Steps

1. รัน Backend API
2. ทดสอบ API ด้วย Postman หรือ Browser
3. เชื่อมต่อหน้า Order Page กับ API
4. เชื่อมต่อ Google OAuth callback
5. เชื่อมต่อหน้า Dashboard กับ Statistics API
