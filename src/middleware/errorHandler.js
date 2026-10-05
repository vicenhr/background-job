export function notFound(req, res) {
    res.status(404).json({ error: 'route not found' });
}

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'invalid JSON body' });
    }

    const status = err.status ?? err.statusCode ?? 500;

    if (status >= 500) {
        console.error('Unhandled error:', err);
        return res.status(500).json({ error: 'internal server error' });
    }

    return res.status(status).json({ error: 'bad request' });
}