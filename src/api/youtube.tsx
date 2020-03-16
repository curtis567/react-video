import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

export const youTubeKey = "AIzaSyAGTUQD5ZBI3jabkfl5vRnuzEvZ25wHqN4";
