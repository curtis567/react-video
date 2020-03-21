export interface VideoDetail {
  kind: string;
  etag: string;
  id: VideoID;
  snippet: VideoSnippet;
}

export interface VideoID {
  kind: string;
  videoId: string;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: VideoSnippetThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface VideoSnippetThumbnails {
  default: VideoSnippetDetail;
  medium: VideoSnippetDetail;
  high: VideoSnippetDetail;
}

export interface VideoSnippetDetail {
  url: string;
  width: number;
  height: number;
}

export interface VideoPageToken {
  prevPageToken: string;
  nextPageToken: string;
}
