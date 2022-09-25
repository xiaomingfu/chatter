export function queryParamToString(
  queryParam: string | string[] | undefined
): string {
  if (Array.isArray(queryParam)) {
    return queryParam.join(",");
  }
  return queryParam || "";
}
