import { strapi } from '@utils/lib'
import type { NextApiRequest, NextApiResponse } from 'next'
import stream from 'stream'
import { promisify } from 'util'
const pipeline = promisify(stream.pipeline)

type Data = {
	message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const hash = req.query.hash as string

	// first, get the filename from strapi
	const file = await strapi.getBinaryFromDownloadHash(hash)
	if (!file) {
		res.status(404).json({ message: 'Not found' })
		return
	}
	
	const url = `${process.env['STRAPI_URL']}${file.url}`

	const response = await fetch(url)
	if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)

	res.setHeader('Content-Type', file.mime)
	res.setHeader('Content-Disposition', `attachment; filename=${file.url.split('/').at(-1)}`)

	// @ts-ignore
	await pipeline(response.body, res)
}

export default handler