export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user`;
    return Response.redirect(githubAuthUrl, 302);
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await tokenResponse.json();
  const token = data.access_token;
  const provider = 'github';

  const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<p>Authenticating, please wait...</p>
<script>
(function() {
  function receiveMessage(e) {
    console.log('received message', e);
    window.opener.postMessage(
      'authorization:${provider}:success:${JSON.stringify({token, provider})}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  console.log('sending authorizing message');
  window.opener.postMessage('authorizing:${provider}', '*');
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
