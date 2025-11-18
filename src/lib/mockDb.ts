// Mock Database (In-Memory) - ใช้ชั่วคราวจนกว่า Backend จะพร้อม
// เปลี่ยนเป็น false เมื่อต้องการใช้ Backend จริง
export const USE_MOCK = true; // รอเพื่อนแก้ Backend ก่อน

export interface MockUser {
  id: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string; // เก็บไว้เพื่อเช็ค login (ในระบบจริงต้อง hash)
  createdAt: string;
}

// ใช้ global object เพื่อเก็บข้อมูลข้าม requests ใน development mode
declare global {
  var mockUsers: MockUser[] | undefined;
}

// In-memory database (persist across hot reloads)
export const mockUsers: MockUser[] = global.mockUsers || [];
if (!global.mockUsers) {
  global.mockUsers = mockUsers;
}

// Helper functions
export const findUserByEmail = (email: string) => {
  return mockUsers.find(u => u.email === email);
};

export const createUser = (userData: Omit<MockUser, 'id' | 'createdAt'>) => {
  const newUser: MockUser = {
    ...userData,
    id: mockUsers.length + 1,
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
};

export const getAllUsers = () => {
  return mockUsers;
};
