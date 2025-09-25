// netlify/functions/get-release-by-tag.js
exports.handler = async function (event) {
  try {
    const owner = process.env.GH_OWNER;
    const repo = process.env.GH_REPO;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const tag = event.queryStringParameters.tag;
    if (!tag) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'missing_tag',
          message: 'Debe indicar ?tag=...',
        }),
      };
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'ksec-get-release',
    };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    const url = `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
    const resp = await fetch(url, { headers });

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({
          error: `GitHub API ${resp.status}`,
          text: await resp.text(),
        }),
      };
    }

    const json = await resp.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'internal_error', message: err.message }),
    };
  }
};
