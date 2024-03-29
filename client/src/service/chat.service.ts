import { getMethodAPI, postMethodAPI } from "./base.service";

export const getTitleMessage = async (userId: number) => {
  const response = await getMethodAPI(`/chats/get-message-titles/${userId}`);
  return response;
};

export const getMessages = async (payload: { members: number[] }) => {
  const response = await postMethodAPI("/chats/get-message", payload);
  return response;
};
