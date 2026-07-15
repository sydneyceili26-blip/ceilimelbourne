const BUNDLE_ID = "com.sydneyceili.app";

async function signJwt(teamId: string, keyId: string, privateKeyPem: string): Promise<string> {
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes.buffer,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );

  const header = btoa(JSON.stringify({ alg: "ES256", kid: keyId }))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const payload = btoa(JSON.stringify({ iss: teamId, iat: Math.floor(Date.now() / 1000) }))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const data = new TextEncoder().encode(`${header}.${payload}`);
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, cryptoKey, data);
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${header}.${payload}.${sigB64}`;
}

export async function sendApnsPush(
  deviceToken: string,
  notification: { title: string; body: string },
  data?: Record<string, string>
): Promise<void> {
  const teamId = Deno.env.get("APNS_TEAM_ID");
  const keyId = Deno.env.get("APNS_KEY_ID");
  const privateKey = Deno.env.get("APNS_PRIVATE_KEY");

  if (!teamId || !keyId || !privateKey) return;

  const jwt = await signJwt(teamId, keyId, privateKey);

  const res = await fetch(
    `https://api.push.apple.com/3/device/${deviceToken}`,
    {
      method: "POST",
      headers: {
        authorization: `bearer ${jwt}`,
        "apns-topic": BUNDLE_ID,
        "apns-push-type": "alert",
        "apns-priority": "10",
        "content-type": "application/json",
      },
      body: JSON.stringify({ aps: { alert: notification, sound: "default" }, ...data }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("APNs error", res.status, body);
  }
}
