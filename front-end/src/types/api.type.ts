export type loginType = { email: string; password: string };
export type ResetPasswordType = { password: string, oobCode: string };
export type LoginResponseType = {
  message: string;
  user: {
    token: string;
    refreshToken: string;
  };
};

// USER TYPE
export type UserType = {
  user_id: string;
  email: string;
  emailVerified: boolean;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};

export type SendEmailResetPasswordType = {
  email: string
};
export type SendEmailResetPasswordResponseType = {
  message: string
};

export type PaginationType = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  skip: number;
  limit: number;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type OrderType = {
  _id: string;
  totalAmount: string;
};

export type AllProductPayloadType = {
  keyword?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
};
export type AllOrderPayloadType = {
  pageNumber?: number | null;
  pageSize?: number | null;
};

export type AllProductResponseType = {
  message: string;
  product: ProductType[];
  pagination: PaginationType;
};
export type AllOrderResponseType = {
  message: string;
  order: OrderType[];
  pagination: PaginationType;
};

export type CreateProductPayloadType = {
  data: {
    name: string;
    price: number;
    stock: number;
  };
};
export type EditProductPayloadType = {
  productId: string;
  data: {
    name: string;
    price: number;
    stock: number;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};