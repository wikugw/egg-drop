export type LoginResponse = {
  success: boolean;
  user: UserResponse;
};

export type UserResponse = {
  id: number;
  email: string;
};
