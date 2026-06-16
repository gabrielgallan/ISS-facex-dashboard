const fs = require('node:fs')
const path = require('node:path')

module.exports = (req, res, next) => {
	const requestPath = req.path || req.url?.split('?')[0] || req.originalUrl?.split('?')[0]

	if (req.method !== 'POST' || requestPath !== '/v1/archive' || req.query.action !== 'list') {
		return next()
	}

	const databasePath = path.resolve(process.cwd(), 'server.json')
	const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'))
	const archive = database.archive

	const limit = Number(req.query.limit ?? archive.detections.length)
	const offset = Number(req.query.offset ?? 0)
	const detections = archive.detections.slice(offset, offset + limit)
	const nextOffset = offset + limit
	const prevOffset = Math.max(offset - limit, 0)
	const hasNextPage = nextOffset < archive.detections.length
	const hasPrevPage = offset > 0

	return res.json({
		_pagination: {
			next_link: hasNextPage ? `/v1/archive?action=list&limit=${limit}&offset=${nextOffset}` : null,
			prev_link: hasPrevPage ? `/v1/archive?action=list&limit=${limit}&offset=${prevOffset}` : null,
			total_records: archive.detections.length,
		},
		detections,
	})
}
