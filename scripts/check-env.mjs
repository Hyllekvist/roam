const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
];

const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing env vars:\n" + missing.map((m) => `- ${m}`).join("\n"));
  process.exit(1);
}
console.log("Env OK");
