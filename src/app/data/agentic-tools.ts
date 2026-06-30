export interface AgenticTool {
  name: string;
  summary: string;
  strength: string;
}

export const agenticTools: AgenticTool[] = [
  {
    name: "Opencode",
    summary: "Primary environment for shipping changes directly inside the codebase with fast repo awareness.",
    strength: "Implementation and repo-native iteration",
  },
  {
    name: "Claude Code",
    summary: "Useful for deep reasoning, repository understanding, and larger multi-file edits with strong code context.",
    strength: "Exploration, refactors, and technical review",
  },
  {
    name: "Codex",
    summary: "Strong for fast execution loops, targeted code generation, and checking multiple approaches quickly.",
    strength: "Rapid prototyping and focused delivery",
  },
];
