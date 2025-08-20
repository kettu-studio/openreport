export type PreparedGitleaksData = {
  findings: any[];
  summary: { total: number; byRule: Record<string, number> };
  lastDate?: string;
};

export function prepareGitleaksData(report: any[]): PreparedGitleaksData {
  const findings = Array.isArray(report) ? report : [];
  const summary = findings.reduce(
    (acc: any, f: any) => {
      acc.total++;
      const rule = String(f?.RuleID || 'unknown');
      acc.byRule[rule] = (acc.byRule[rule] || 0) + 1;
      return acc;
    },
    { total: 0, byRule: {} as Record<string, number> }
  );
  let lastDate: string | undefined = undefined;
  for (const f of findings) {
    const d = f?.Date ? new Date(f.Date) : undefined;
    if (d && !Number.isNaN(d.getTime())) {
      if (!lastDate || d > new Date(lastDate)) lastDate = d.toISOString();
    }
  }
  return { findings, summary, lastDate };
}


