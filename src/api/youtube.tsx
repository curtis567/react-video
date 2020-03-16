import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

export const youTubeKey = "AIzaSyB6tJD2h7NjbIVA_jenF9UnIkiFMQ6a5Nk";
