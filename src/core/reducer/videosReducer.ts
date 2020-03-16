import {
  VIDEOS_LIST,
  VIDEOS_SEARCH_ITEM,
  VIDEOS_PAGE_TOKEN,
  VIDEOS_CONTENT_DETAIL,
  CLEAR_VIDEOS_CONTENT_DETAIL,
  UPDATE_LOCAL_STORAGE_ID,
  DELETE_LOCAL_STORAGE_ID
} from "../constants/action_type";
import { combineReducers } from "redux";

function videosCalculator(state = [], action: any) {
  switch (action.type) {
    case VIDEOS_LIST:
      return action.Videos;
    default:
      return state;
  }
}

function searchItemCalculator(state = [], action: any) {
  switch (action.type) {
    case VIDEOS_SEARCH_ITEM:
      return action.item;
    default:
      return state;
  }
}

function pageTokenCalculator(state = [], action: any) {
  switch (action.type) {
    case VIDEOS_PAGE_TOKEN:
      return action.payload;
    default:
      return state;
  }
}

function videosContentDetailsCalculator(state = [], action: any) {
  switch (action.type) {
    case VIDEOS_CONTENT_DETAIL:
      return [...state, action.item];
    case CLEAR_VIDEOS_CONTENT_DETAIL:
      return (state = []);
    default:
      return state;
  }
}

function LocalStorageIdCalculator(state: Array<any> = [], action: any) {
  const newItems = [...state];
  const index = newItems.findIndex(item => item === action.id);
  switch (action.type) {
    case UPDATE_LOCAL_STORAGE_ID:
      if (index === -1) {
        newItems.push(action.id);
        localStorage.setItem("localStorageId", JSON.stringify({ newItems }));
        return newItems;
      } else {
        localStorage.setItem("localStorageId", JSON.stringify({ newItems }));
        return newItems;
      }
    case DELETE_LOCAL_STORAGE_ID:
      if (index !== -1) {
        newItems.splice(index, 1);
        if (newItems.length === 0) {
          localStorage.removeItem("localStorageId");
        } else {
          localStorage.setItem("localStorageId", JSON.stringify({ newItems }));
        }
        return newItems;
      }
      return newItems;
    default:
      return state;
  }
}

const calculatorApp = combineReducers({
  videosCalculator,
  searchItemCalculator,
  pageTokenCalculator,
  videosContentDetailsCalculator,
  LocalStorageIdCalculator
});

export default calculatorApp;
