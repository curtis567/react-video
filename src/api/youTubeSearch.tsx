import youTube, { youTubeKey } from "../api/youtube";

export async function youTubeSearch(
  searchItem?: any,
  getVideoList?: any,
  getVideoPageToken?: any,
  prevPageToken?: string,
  nextPageToken?: string
) {
  const res = await youTube.get("search", {
    params: {
      part: "snippet",
      maxResults: "12",
      type: "video",
      key: youTubeKey,
      q: searchItem,
      pageToken: prevPageToken ? prevPageToken : nextPageToken
    }
  });

  getVideoPageToken({
    prevPageToken: res.data.prevPageToken ? res.data.prevPageToken : null,
    nextPageToken: res.data.nextPageToken ? res.data.nextPageToken : null
  });

  getVideoList(res.data.items);
}
