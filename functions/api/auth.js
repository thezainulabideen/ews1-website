export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('scope', 'repo,user');
    return Response.redirect(githubAuthUrl.toString(), 302);
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
      code: code
    })
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response('OAuth error: ' + data.error_description, { status: 400 });
  }

  const token = data.access_token;
  const provider = 'github';
  const message = JSON.stringify({ token: token, provider: provider });

  const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<p>Authenticating, please wait...</p>
<script>
(function() {
  var token = "${token}";
  var provider = "${provider}";
  var message = '{"token":"' + token + '","provider":"' + provider + '"}';

  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:' + provider + ':success:' + message,
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
    window.close();
  }

  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:' + provider, '*');
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
