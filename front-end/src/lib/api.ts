import type { AllOrderPayloadType, AllOrderResponseType, AllProductPayloadType, AllProductResponseType, CreateProductPayloadType, CurrentUserResponseType, EditProductPayloadType, LoginResponseType, loginType, registerType } from "@/types/api.type";
import API from "./axios-client";



export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };

export const logoutMutationFn = async () => await API.post("/auth/logout");

export const getAllProductQueryFn = async ({
  keyword,
  pageNumber,
  pageSize,
}: AllProductPayloadType): Promise<AllProductResponseType> => {
  const baseUrl = `/product/all`;

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append("keyword", keyword);
  if (pageNumber) queryParams.append("pageNumber", pageNumber?.toString());
  if (pageSize) queryParams.append("pageSize", pageSize?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await API.get(url);
  return response.data;
};
export const getAllProductOrderQueryFn = async (): Promise<AllProductResponseType> => {
  const baseUrl = `/product/all`;

  const queryParams = new URLSearchParams();

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await API.get(url);
  return response.data;
};

export const createProductMutationFn = async ({
  data,
}: CreateProductPayloadType) => {
  const response = await API.post(
    `/product/create`,
    data
  );
  return response.data;
};

export const editProductMutationFn = async ({
  productId,
  data,
}: EditProductPayloadType): Promise<{ message: string; }> => {
  const response = await API.put(
    `/product/${productId}/update`,
    data
  );
  return response.data;
};

export const deleteProductMutationFn = async ({
  productId,
}: {
  productId: string;
}): Promise<{
  message: string;
}> => {
  const response = await API.delete(
    `product/${productId}/delete`
  );
  return response.data;
};

export const getAllOrderQueryFn = async ({
  pageNumber,
  pageSize,
}: AllOrderPayloadType): Promise<AllOrderResponseType> => {
  const baseUrl = `/order/all`;

  const queryParams = new URLSearchParams();
  if (pageNumber) queryParams.append("pageNumber", pageNumber?.toString());
  if (pageSize) queryParams.append("pageSize", pageSize?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await API.get(url);
  return response.data;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post("/auth/register", data);
