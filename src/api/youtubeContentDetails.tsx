import youTube, { youTubeKey } from "../api/youtube";

export async function youtubeContentDetails(
  videoId: string,
  getVideoContentDetail: (duration: string) => void
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
