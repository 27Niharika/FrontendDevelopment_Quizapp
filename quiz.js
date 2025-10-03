localStorage.setItem("playerName", "Niharika"); 
localStorage.setItem("topic", selectedTopic);
localStorage.setItem("level", selectedLevel);
localStorage.setItem("score", score);
localStorage.setItem("totalQuestions", quizData[selectedTopic][selectedLevel].length);
window.location.href = "score.html";
