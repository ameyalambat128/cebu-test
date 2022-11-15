import { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi(
  "AAAAAAAAAAAAAAAAAAAAAJMAjQEAAAAAubAnqUuH7zDb0szMmri3RC766iw%3DPpbW0Ato7p5w3l3Q8NZHdOgAjcln0lH8SkG8aLNSzvDq7yrMvF"
);

const userController = async (req: Request, res: Response) => {
  try {
    const { twitterUsername } = req.params;

    if (typeof twitterUsername === "string") {
      const result = await client.v2.userByUsername(twitterUsername, {
        "user.fields": [
          "id",
          "public_metrics",
          "description",
          "created_at",
          "profile_image_url",
          "location",
          "verified",
        ],
      });
      result.data.url = `https://twitter.com/${twitterUsername}`;
      console.log(result);
      res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
  }
};

export { userController };
