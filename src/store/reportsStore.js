import { randomUUID } from 'crypto';

const reports = new Map();

export function createReport(topic) {
    const report = { id: randomUUID(), topic, status: 'pending' };
    reports.set(report.id, report);
    return report;
}

export function updateReport(id, data){
    const report = reports.get(id);
    if(!report) return null;
    const updated = { ...report, ...data };
    reports.set(id, updated);
    return updated;
}

export function getReportById(id){
    return reports.get(id) ?? null;
}