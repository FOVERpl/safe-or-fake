async function analyze() {
  const input = document.getElementById("input").value;
  const result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "Wklej coś najpierw.";
    return;
  }

  result.innerHTML = "Analizowanie...";

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDlT0R0X5ll27oY8HRcA9e-eI0gMtfhShw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Oceń czy to wygląda na scam. Daj krótką odpowiedź i red flagi: ${input}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    const text = data.candidates[0].content.parts[0].text;

    result.innerHTML = text;

  } catch (error) {
    result.innerHTML = "Błąd podczas analizy.";
    console.error(error);
  }
}
