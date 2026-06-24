// Object storage + notification client.
// NOTE: test fixtures for gitleaks scanning — all credentials below are fake.

// FAKE — AWS access key id / secret access key patterns
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// FAKE — GitHub personal access token pattern
const GITHUB_TOKEN = "ghp_R8tQ2wXyZ4aBcD6eFgHiJkLmN0pQrS1tUvWx";

// FAKE — Slack bot token pattern
const SLACK_BOT_TOKEN = "xoxb-2483920482-2938472938472-aBcDeFgHiJkLmNoPqRsTuVwX";

export interface UploadOptions {
  bucket: string;
  key: string;
  contentType?: string;
}

export function buildObjectUrl(opts: UploadOptions): string {
  return `https://${opts.bucket}.s3.amazonaws.com/${encodeURIComponent(opts.key)}`;
}

export function s3Credentials() {
  return {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  };
}

export async function notifyUpload(key: string): Promise<void> {
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: "#uploads",
      text: `New object stored: ${key}`,
    }),
  });
}

export async function mirrorToGitHubGist(content: string): Promise<Response> {
  return fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      public: false,
      files: { "backup.txt": { content } },
    }),
  });
}
