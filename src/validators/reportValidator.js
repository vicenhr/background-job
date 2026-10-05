const MAX_TOPIC_LENGTH = 100;

export function validateReportInput(body) {
    const topic = body?.topic;

    if (typeof topic !== 'string' || topic.trim() === '') {
        return { ok: false, error: 'topic is required and must be a non-empty string' };
    }
    if (topic.trim().length > MAX_TOPIC_LENGTH) {
        return { ok: false, error: `topic must be at most ${MAX_TOPIC_LENGTH} characters` };
    }

    return { ok: true, topic: topic.trim() };
}