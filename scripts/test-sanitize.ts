import { sanitizePlainText } from "../src/lib/sanitize";

const examples = [
  {
    label: "XSS attempt (script tag)",
    input: "Hello <script>alert('Hacked!')</script> world",
  },
  {
    label: "XSS attempt (img onerror)",
    input: "<img src=x onerror=alert(1)>Nice try",
  },
  {
    label: "SQLi-looking payload (not solved by sanitizer)",
    input: "' OR 1=1 --",
  },
];

function main() {
  console.log("Input sanitization evidence (scripts/test-sanitize.ts)\n");

  for (const ex of examples) {
    const output = sanitizePlainText(ex.input);
    console.log(`- ${ex.label}`);
    console.log(`  before: ${JSON.stringify(ex.input)}`);
    console.log(`  after : ${JSON.stringify(output)}\n`);
  }

  console.log(
    "Note: SQL injection is prevented by parameterized queries (Prisma) and avoiding raw SQL, not by HTML sanitization."
  );
}

main();
