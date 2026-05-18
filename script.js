// सारे नोट्स यहां लोड होंगे
let data = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        const jsonData = await response.json();
        data = jsonData;
        showAllNotes();
    } catch (error) {
        console.error("डेटा लोड करने में समस्या:", error);
        document.getElementById('results').innerHTML = '<p>डेटा लोड करने में समस्या आई। data.json फाइल चेक करें।</p>';
    }
}

function showAllNotes() {
    displayResults(data);
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#e74c3c;">कोई नोट नहीं मिला 😔</p>';
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

// सर्च फंक्शन
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

// पेज लोड होने पर डेटा लोड करो
loadData();
