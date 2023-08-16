export interface UserCreatePayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  veryfy_token: string;
  verify_status: boolean;
}
