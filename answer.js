const params = new URLSearchParams(window.location.search);
const uniqueId = params.get('id');
const databaseUrl = 'https://thequestion-7d499-default-rtdb.firebaseio.com/questions.json'; // Replace with Firebase Database URL

async function loadQuestion() {
    const response = await fetch(databaseUrl);
    const data = await response.json();
    const question = Object.values(data).find(q => q.uniqueId == uniqueId);

    if (question) {
        document.getElementById('questionText').innerText = question.question;
        document.getElementById('answerForm').classList.remove('hidden');
    } else {
        document.getElementById('questionText').innerText = 'Question not found.';
    }
}

document.getElementById('answerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const answer = document.getElementById('answer').value;

    try {
        await fetch(`${databaseUrl}/${uniqueId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wifeAnswer: answer }),
        });
        window.location.href = `results.html?id=${uniqueId}`;
    } catch (error) {
        console.error("Error submitting answer:", error);
    }
});

loadQuestion();
