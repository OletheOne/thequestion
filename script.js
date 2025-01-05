const databaseUrl = 'https://thequestion-7d499-default-rtdb.firebaseio.com/questions.json'; // Replace with Firebase URL

document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const yourAnswer = document.getElementById('answer').value;
    const uniqueId = Date.now();

    // Save to database
    try {
        await fetch(databaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, yourAnswer, uniqueId }),
        });

        // Generate link
        const link = `${window.location.origin}/answer.html?id=${uniqueId}`;
        document.getElementById('generatedLink').href = link;
        document.getElementById('linkContainer').classList.remove('hidden');
    } catch (error) {
        console.error("Error generating link:", error);
    }
});
