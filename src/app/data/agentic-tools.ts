export interface AgenticTool {
  name: string;
  summary: string;
  strength: string;
}

export const agenticTools: AgenticTool[] = [
  {
    name: "Opencode",
    summary: "The agentic harness I use to this day and prefer over others for its out-of-the-box readiness and flexible CLI workflow.",
    strength: "My primary environment for agentic delivery",
  },
  {
    name: "Claude Code",
    summary: "I used Claude Code in the past for an Anthropic-native feel before discovering Opencode.",
    strength: "My earlier Anthropic-native workflow",
  },
  {
    name: "Codex",
    summary: "The first agentic harness I used, and one I still use when something cannot be achieved through Opencode.",
    strength: "Fallback execution beyond Opencode",
  },
];
