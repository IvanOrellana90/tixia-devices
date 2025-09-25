// netlify/functions/get-release.js
// Node 18+ (fetch disponible)
exports.handler = async function () {
  try {
    const owner = process.env.GH_OWNER;
    const repo = process.env.GH_REPO;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    console.log('Owner:', owner, 'Repo:', repo, 'Token?', !!GITHUB_TOKEN);

    if (!owner || !repo) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'missing_env_vars',
          message:
            'Debes definir GH_OWNER y GH_REPO en las variables de entorno.',
        }),
      };
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'ksec-get-release',
    };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    const releaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    console.log('Fetching release:', releaseUrl);

    const resp = await fetch(releaseUrl, { headers });

    if (resp.status === 304) {
      return {
        statusCode: 304,
        headers: {
          'Content-Type': 'application/json',
          ETag: resp.headers.get('etag') || '',
          'Cache-Control':
            resp.headers.get('cache-control') || 'public, max-age=300',
        },
        body: '',
      };
    }

    if (resp.ok) {
      const json = await resp.json();
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control':
            resp.headers.get('cache-control') || 'public, max-age=300',
          ETag: resp.headers.get('etag') || '',
        },
        body: JSON.stringify(json),
      };
    }

    // fallback a tags si no hay releases
    if (resp.status === 404) {
      const tagsUrl = `https://api.github.com/repos/${owner}/${repo}/tags`;
      const tagsResp = await fetch(tagsUrl, { headers });
      if (!tagsResp.ok) {
        return {
          statusCode: tagsResp.status,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: `GitHub API tags ${tagsResp.status}`,
            body: await tagsResp.text(),
          }),
        };
      }
      const tagsJson = await tagsResp.json();
      if (!Array.isArray(tagsJson) || tagsJson.length === 0) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: 'no_release_no_tags',
            message: 'No se encontró release ni tags en el repo.',
          }),
        };
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fallback: true,
          source: 'tags',
          tags: tagsJson,
        }),
      };
    }

    return {
      statusCode: resp.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: `GitHub API ${resp.status}`,
        body: await resp.text(),
      }),
    };
  } catch (err) {
    console.error('get-release error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'internal_error', message: err.message }),
    };
  }
};
