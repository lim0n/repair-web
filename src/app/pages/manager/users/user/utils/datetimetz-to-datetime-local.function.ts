export function datetimeTzToDatetimeLocal(datetimeTz: string): string {
  return String(new Date(datetimeTz).toISOString().slice(0, 16));
}