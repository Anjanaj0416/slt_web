interface User {
  id: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
  dateOfBirth: Date | string;
  verified: boolean;
  name: { firstName: string; lastName: string };
}
//
export interface User1 {
  id: string;
  email: string;
  phone: string;
  avatar?: string;
  birthDay: Date | string;
  firstName: string;
  lastName: string;
  username: string;
}
//
export default User;
