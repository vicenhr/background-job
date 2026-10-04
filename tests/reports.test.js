import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';
import { inngest } from '../src/inngest/client.js';

describe('POST /reports', () => {
    let sendSpy;

    beforeEach(() => {
        sendSpy = jest.spyOn(inngest, 'send').mockResolvedValue({ ids: ['test'] });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // ... tus tests actuales van aquí, sin cambios ...

    it('manda el evento report/requested con id y topic', async () => {
        const res = await request(app).post('/reports').send({ topic: 'cats' });
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            name: 'report/requested',
            data: { id: res.body.id, topic: 'cats' },
        });
    });

    it('no manda evento si el input es inválido', async () => {
        await request(app).post('/reports').send({});
        expect(sendSpy).not.toHaveBeenCalled();
    });

    it('responde 503 si Inngest falla al recibir el evento', async () => {
        sendSpy.mockRejectedValue(new Error('inngest down'));
        const res = await request(app).post('/reports').send({ topic: 'cats' });
        expect(res.status).toBe(503);
    });
});