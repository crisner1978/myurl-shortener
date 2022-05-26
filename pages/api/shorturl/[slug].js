import dbConnect from "../../../lib/dbConnect";
import ShortURL from "../../../models/shortURLModel"

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect()
    return getShortURL(req, res)
  }
}

async function getShortURL(req, res) {
  let { slug } = req.query;
  ShortURL.find({ suffix: slug }).then(function (foundUrls) {
    let urlRedirect = foundUrls[0];
    res.redirect(urlRedirect.original_url);
  });
}

