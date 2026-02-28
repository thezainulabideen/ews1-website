export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo`;
    return Response.redirect(githubAuthUrl, 302);
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await response.json();
  const token = data.access_token;

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
    </body>
    </html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
