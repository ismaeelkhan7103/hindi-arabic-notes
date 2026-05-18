let data = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        showAllNotes();
    } catch (error) {
        document.getElementById('results').innerHTML = '<p>डेटा लोड करने में समस्या आई</p>';
    }
}

function showAllNotes() {
    displayResults(data);
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:red;">कोई नोट नहीं मिला 😔</p>';
        return;
    }

    results.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <h3>${note.hindi}</h3>
            <p style="font-size:24px; color:#27ae60; margin:10px 0;">${note.arabic_hindi}</p>
        `;
        container.appendChild(div);
    });
}

// सर्च
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    
    if (term === '') {
        showAllNotes();
        return;
    }

    const filtered = data.filter(note => 
        note.hindi.toLowerCase().includes(term) || 
        note.arabic_hindi.toLowerCase().includes(term)
    );
    
    displayResults(filtered);
});

loadData();
