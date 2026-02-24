export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  user_role?: 'admin' | 'manager' | 'editor' | 'viewer';
  access_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
