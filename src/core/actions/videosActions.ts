import {
  VIDEOS_LIST,
  VIDEOS_SEARCH_ITEM,
  VIDEOS_PAGE_TOKEN,
  VIDEOS_CONTENT_DETAIL,
  CLEAR_VIDEOS_CONTENT_DETAIL,
  UPDATE_LOCAL_STORAGE_ID,
  DELETE_LOCAL_STORAGE_ID
} from "../constants/action_type";

export const getVideoList = (Videos: any) => {
  return {
    type: VIDEOS_LIST,
    Videos
  };
};

export const getVideoSearchItem = (item: any) => {
  return {
    type: VIDEOS_SEARCH_ITEM,
    item
  };
};

export const getVideoPageToken = (payload: {
  prevPageToken: string;
  nextPageToken: string;
}) => {
  return {
    type: VIDEOS_PAGE_TOKEN,
    payload
  };
};

export const getVideoContentDetail = (item: any) => {
  return {
    type: VIDEOS_CONTENT_DETAIL,
    item
  };
};

export const clearVideoContentDetail = () => {
  return {
    type: CLEAR_VIDEOS_CONTENT_DETAIL
  };
};

export const updateLocalStorageId = (id: string) => {
  return {
    type: UPDATE_LOCAL_STORAGE_ID,
    id
  };
};

export const deleteLocalStorageId = (id: string) => {
  return {
    type: DELETE_LOCAL_STORAGE_ID,
    id
  };
};
