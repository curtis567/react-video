import youTube, { youTubeKey } from "../api/youtube";

export async function youtubeContentDetails(
  videoId: any,
  getVideoContentDetail: any
) {
  const res = await youTube.get("videos", {
    params: {
      part: "contentDetails",
      id: videoId,
      key: youTubeKey
    }
  });
  getVideoContentDetail(res.data.items[0].contentDetails.duration);
}
