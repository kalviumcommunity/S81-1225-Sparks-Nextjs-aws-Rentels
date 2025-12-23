// Test file with intentional lint violations
export default function TestComponent() {
  const unusedVariable = "This will trigger noUnusedLocals";
  console.log("This will trigger no-console warning");

  return (
    <div>
      <h1>Test Component</h1>
      <p>This file has intentional violations:</p>
      <ul>
        <li>Single quotes instead of double quotes</li>
        <li>Missing semicolons</li>
        <li>Console.log statement</li>
        <li>Unused variable</li>
      </ul>
    </div>
  );
}
