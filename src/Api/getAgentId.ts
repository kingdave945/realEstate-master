// src/utils/getAgentId.ts
import axios from "axios";

export const getAgentIdByEmail = async (email: string, token: string): Promise<number | null> => {
  try {
    const res = await axios.get("http://kendis-001-site1.ntempurl.com/api/Agent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const agents = res.data.data;

    const match = agents.find(
      (agent: any) => agent.email.toLowerCase() === email.toLowerCase()
    );

    if (match) {
      return match.id;
    } else {
      console.warn("Agent not found for this email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching agent ID:", error);
    return null;
  }
};
