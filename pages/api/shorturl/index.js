import dns from 'dns'
import urlParser from 'url'
import { customAlphabet, nanoid } from 'nanoid'
import ShortURL from '../../../models/shortURLModel'
import dbConnect from '../../../lib/dbConnect'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect()
    const suffix = nanoid(5)
    let requestedURL = JSON.parse(req.body)
    let newShortURL = suffix
    dns.lookup(urlParser.parse(requestedURL).hostname, async(error, address) => {
      if (!address) res.json({ error: 'Invalid URL' })

      let newURL =  new ShortURL({
        short_url: newShortURL,
        original_url: requestedURL,
        suffix: newShortURL,
      })

      await newURL.save(function (err, doc) {
        if (err) return console.error(err)
        res.status(200).json({
          short_url: newURL.short_url,
          original_url: newURL.original_url,
        })
      })
    })
  }
}
