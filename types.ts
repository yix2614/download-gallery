
export interface TikTokTrend {
  id: string;
  user: string;
  caption: string;
  likes: string;
  imageUrl: string;
  category: string;
}

export interface GeminiResponse {
  trends: TikTokTrend[];
}
