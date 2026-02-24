export function datetimeLocalToDatetimeTzUtcPlus_3(datetimeLocal: string): string {
  const date = new Date(datetimeLocal);
  const utcDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
  return utcDate.toISOString();
}