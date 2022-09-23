export type TimeLine = {
  authorInfoTimeline?:
    | {
        id?: string | undefined;
        author_id?: string | undefined;
        author_username: string | undefined;
        author_name: string | undefined;
        author_profile_image_url: string | undefined;
        text?: string | undefined;
        created_at?: string | undefined;
      }[]
    | undefined;
};
