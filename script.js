let data = [];

async function loadData() {
    const response = await fetch('data.json');
    data = await response.json();
    showAllNotes();
}

function showAllNotes() {
    displayResults(data);
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#e74c3c; padding:20px;">कोई नोट नहीं मिला 😔</p>';
        return;
    }

    results.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <h3>${note.हिंदी}</h3>
            <p class="arabic">${note.आरबी}</p>
        `;
        container.appendChild(div);
    });
}

// पुराना Simple Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    
    if (term === '') {
        showAllNotes();
        return;
    }

    const filtered = data.filter(note => 
        (note.हिंदी && note.हिंदी.toLowerCase().includes(term)) ||
        (note.आरबी && note.आरबी.toLowerCase().includes(term))
    );
    
    displayResults(filtered);
});

loadData();
