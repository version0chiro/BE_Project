import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: any) {
  console.log(req.body.recipeTitle);

  await fetch(
    "https://www.googleapis.com/customsearch/v1?key=" +
      process.env.GOOGLE_API +
      "&cx=" +
      process.env.CSX_API +
      "&q=" +
      req.body.recipeTitle
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.items[0].pagemap.cse_image[0].src);
      if (typeof data.items !== "undefined" && data.items)
        res.json({ url: data.items[0].pagemap.cse_image[0].src });
      else res.json({ url: "https://picsum.photos/200/" });
    });
}
