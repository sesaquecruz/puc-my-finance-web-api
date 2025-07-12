export function mapToHttpDto<T extends object>(dto: T): T {
  return JSON.parse(JSON.stringify(dto));
}
