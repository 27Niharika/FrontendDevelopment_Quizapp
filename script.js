async function fetchQuizData(cat, topic, level) {
  const res = await fetch("/get-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: cat, topic: topic, level: level }),
  });

  const data = await res.json();
  quizData = data.questions;

  if (!quizData || quizData.length === 0) {
    questionEl.textContent = "⚠️ Failed to load questions.";
    return;
  }

  startScreen.classList.add("hidden");
  quizEl.classList.remove("hidden");
  timerBar.classList.remove("hidden");
  loadQuestion();
}
