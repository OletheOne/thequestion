const params = new URLSearchParams(window.location.search);
const uniqueId = params.get('id');
const databaseUrl = 'https://thequestion-7d499-default-rtdb.firebaseio.com/questions.json'; // Replace with Firebase Database URL

async function loadResults() {
    const response = await fetch(databaseUrl);
    const data = await response.json();
    const question = Object.values(data).find(q => q.uniqueId == uniqueId);

    if (question) {
        const { question: questionText, yourAnswer, wifeAnswer } = question;

        if (!yourAnswer || !wifeAnswer) {
            document.getElementById('results').innerText = 'Both answers are not submitted yet.';
            return;
        }

        document.getElementById('results').innerHTML = `
            <p><strong>Question:</strong> ${questionText}</p>
            <p><strong>Your Answer:</strong> ${yourAnswer}</p>
            <p><strong>Wife's Answer:</strong> ${wifeAnswer}</p>
        `;
    } else {
        document.getElementById('results').innerText = 'Results not found.';
    }
}

loadResults();
