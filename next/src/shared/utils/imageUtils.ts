import { API_BASE_URL } from '../config/api';

export const getImageUrl = (postId: number, imageId: number): string => {
  return `${API_BASE_URL}/api/news/${postId}/images/${imageId}`;
};

export const getImageUrlFromPost = (postId: number, image: { id: number }): string => {
  return getImageUrl(postId, image.id);
};