import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ans: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let ans: any = "";
  await fetch("http://localhost:5000/coffee&&sugar").then((response) =>
    response.json().then((data) => {
      console.log(data.ans);
      ans = data.ans;
    })
  );
  let myArray = ans.split("--|||||--");
  console.log(myArray);

  res.send(myArray);
}
