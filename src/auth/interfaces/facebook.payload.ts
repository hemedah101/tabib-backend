export interface FacebookSub {
  id: string;
  displayName: string;
  provider: string;
  photos: { value: string }[];
  _json: {
    id: string;
    name: string;
    picture: {
      data: {
        height: number;
        is_silhouette: boolean;
        url: string;
        width: number;
      };
    };
  };
}
