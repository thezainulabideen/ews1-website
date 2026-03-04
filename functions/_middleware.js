export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'ews1-website.pages.dev') {
    return Response.redirect(
      'https://ews1.co.uk' + url.pathname + url.search,
      301
    );
  }
  return context.next();
}
