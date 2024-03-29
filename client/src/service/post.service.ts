import {
  deleteMethodAPI,
  getMethodAPI,
  patchMethod,
  postMethodAPI,
} from "./base.service";

export const sendPost = async (post: FormData) => {
  const response = await postMethodAPI("/posts", post, true);
  return response;
};

export const getFreePosts = async (page: number) => {
  const { data } = await getMethodAPI(`/posts?page=${page}&limit=5`);
  return data;
};

export const getUserPosts = async (id: number, page: number) => {
  const { data } = await getMethodAPI(`/posts/${id}?page=${page}&limit=5`);
  return data;
};

export const getComment = async (postId: number, page: number) => {
  const { data } = await getMethodAPI(
    `/posts/comment/${postId}?page=${page}&limit=3`
  );
  return data;
};

export const getSpecificPost = async (id: number) => {
  const { data } = await getMethodAPI(`/posts/detail/${id}`);
  return data;
};

export const likePost = async (id: number) => {
  const response = await postMethodAPI(`/posts/like`, { postId: id });
  return response;
};

export const deletePost = async (id: number) => {
  const response = await deleteMethodAPI(`/posts/delete/${id}`);
  return response;
};

export const updatePost = async (id: number, data: FormData) => {
  const response = await patchMethod(`/posts/update/${id}`, data, true);
  return response;
};

export const reportPost = async (payload:{userId:number,postId:number,description:string,title:string}) => {
  await postMethodAPI('/posts/report',payload)
}

export const addComment = async ({
  postId,
  message,
  commentRoot,
}: {
  postId: number;
  message: string;
  commentRoot?: number;
}) => {
  const payload = {
    postId,
    content: message,
  };
  if (commentRoot) {
    Object.assign(payload, { parenCommentId: commentRoot });
  }
  const response = await postMethodAPI(`/posts/comment`, payload);
  return response;
};

export const getNotifications = async ({ userId }: { userId: number }) => {
  const response = await getMethodAPI(`/notifications/${userId}`);

  return response;
};


export const sharePost = async ({
  postId,
  sharedContent,
  userRoot,
}: {
  userRoot: number;
  postId: number;
  sharedContent: string;
}) => {
  const response = await postMethodAPI(`/posts/share`, {
    postId,
    description: sharedContent,
    userRoot,
  });
  return response;
};

export const getSharedPost = async () => {
  const response = await getMethodAPI("/posts/share");
  return response;
};

export const getTags = async () => {
  const response = await getMethodAPI("/posts/tags");
  return response;
};

export const getPostByTags = async (id: number) => {
  return await getMethodAPI(`/posts/tags/${id}`);
};

export const searchPost = async (content: string) => {
  return (await getMethodAPI(`/posts/find/${content}`)).data;
};

export const savePost = async (payload:{userId:number,postId:number}) => {
  return  (await postMethodAPI('/posts/saved-post',payload)).data
}

export const getSavedPost = async (userId:number) =>{
  return (await getMethodAPI(`/posts/saved-post/${userId}`)).data
}
