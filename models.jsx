import React, { useState } from 'react';

function GeminiChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const movies = [
    { "id": 1, "title": "Echoes of Tomorrow", "genre": "Science Fiction", "short_plot_summary": "A scientist discovers messages from the future." },
    { "id": 2, "title": "Midnight in Verona", "genre": "Romance", "short_plot_summary": "Two travelers fall in love in Verona." },
    { "id": 3, "title": "Crimson Heist", "genre": "Action", "short_plot_summary": "A crew steals a gem from a museum." }
    // ... add more as needed
  ];

  const callGeminiAPI = async () => {
    if (!input) return;
    setLoading(true);
    setResponse("");

    // 1. YOUR API KEY
    const API_KEY = "AIzaSyDTzTnbXGJAbRfd9oXxvsX9wF8KJDf0ABk"; 

    // 2. THE CORRECT FULL URL (No curly braces around API_KEY)
    const TARGET_URL = `https://generativelanguage.googleapis.com{API_KEY}`;
    
    // 3. THE PROXY
    const PROXY = "https://corsproxy.io/?";

    try {
      const res = await fetch(PROXY + encodeURIComponent(TARGET_URL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Here is my movie list: ${JSON.stringify(movies)}. Question: ${input}`
            }]
          }]
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status}. ${errorText.substring(0, 50)}`);
      }

      const data = await res.json();

      // 4. CORRECT DATA PATH (Gemini's response structure is deeply nested)
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("AI responded but found no text.");
      }

    } catch (error) {
      console.error("Detailed Error:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Movie AI Helper</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '8px' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about the movies..." 
        />
        <button onClick={callGeminiAPI} disabled={loading} style={{ padding: '8px 15px' }}>
          {loading ? "..." : "Ask"}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '5px' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default GeminiChat;
