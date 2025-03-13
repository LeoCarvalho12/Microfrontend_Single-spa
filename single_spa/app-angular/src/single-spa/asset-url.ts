export function assetUrl(url: string): string {
  // Usa uma variável global definida em outro lugar (por exemplo, no HTML)
  const publicPath = (window as any).__PUBLIC_PATH__ || '/';
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
  const urlPrefix = url.startsWith('/') ? '' : '/';

  return `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
}
