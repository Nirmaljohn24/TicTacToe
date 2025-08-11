export const getAIMoveFromOpenRouter = async (board) => {
    const systemPrompt = `
    You are a smart Tic Tac Toe AI playing as "O".
    
    Your goal:
    1. Win if possible
    2. Block the opponent if they are about to win
    3. Otherwise: choose center > corner > side

    Only return ONE number (0-8). Do not explain.
    `;

    const userPrompt = `
    Current board: ${JSON.stringify(board)}

    Each cell is indexed like this:
    [0][1][2]
    [3][4][5]
    [6][7][8]

    "O" = you (AI)
    "X" = human
    null = empty

    What is your move?
    `;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: "POST",
            headers: {
                Authorization: `Bearer **VITE_OPENROUTER_API_KEY***`, // 🔒 Don't hardcode in public
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // model: "deepseek/deepseek-r1",
                model : "anthropic/claude-3-haiku",
                temperature: 0.2,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ]
            })
        });

        const data = await response.json();
        console.log("API Response:", data);

        // ✅ Correct property path
        const text = data.choices?.[0]?.message?.content?.trim();
        console.log("AI Raw Output:", text);

        if (!text) {
            console.error("AI returned no content.");
            return null;
        }

        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;

    } catch (err) {
        console.error("AI Move Fetch Error:", err);
        return null;
    }
};
