// Server-side request handlers.
// NOTE: intentionally insecure code to exercise Semgrep security rules.

import { exec } from "child_process";
import * as crypto from "crypto";
import * as fs from "fs";
import * as https from "https";
import * as path from "path";

interface Req {
  query: Record<string, string>;
  body: any;
  params: Record<string, string>;
}

// Command injection — user input concatenated into a shell command.
export function runReport(req: Req) {
  const name = req.query.name;
  exec("generate-report --user " + name, (err, stdout) => {
    console.log(stdout);
  });
}

// Code injection — eval of user-controlled data.
export function evalRule(req: Req) {
  const rule = req.body.rule;
  return eval(rule);
}

// SQL injection — string-concatenated query.
export function findUser(db: any, req: Req) {
  const id = req.params.id;
  return db.query("SELECT * FROM users WHERE id = '" + id + "'");
}

// Path traversal — unsanitized path joined to a base directory.
export function readDoc(req: Req) {
  const file = req.query.file;
  return fs.readFileSync(path.join("/var/data/docs", file), "utf8");
}

// Weak hashing — MD5 used for password storage.
export function hashPassword(pw: string): string {
  return crypto.createHash("md5").update(pw).digest("hex");
}

// Insecure cipher — DES / ECB.
export function encrypt(data: string): Buffer {
  const cipher = crypto.createCipheriv("des-ecb", Buffer.alloc(8), null);
  return Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
}

// Insecure randomness for a security token.
export function makeToken(): string {
  return Math.random().toString(36).slice(2);
}

// SSRF — fetch a fully user-controlled URL.
export async function proxy(req: Req): Promise<Response> {
  const url = req.query.url;
  return fetch(url);
}

// Disabled TLS certificate verification.
export function insecureClient() {
  return new https.Agent({ rejectUnauthorized: false });
}

// ReDoS — dynamic RegExp built from user input.
export function matches(req: Req): boolean {
  const pattern = req.query.pattern;
  return new RegExp(pattern).test(req.body.text);
}

// Open redirect — redirect target taken directly from the request.
export function redirect(req: Req, res: any) {
  res.redirect(req.query.next);
}
