let data = [];

async function loadData() {
    const response = await fetch('data.json');
    data = await response.json();
    showAllNotes();
}

function showAllNotes() {
    displayResults(data);
}

function cleanText(text) {
    if (!text) return "";
    return text.toLowerCase()
               .replace(/़|ा|ी|ू|े|ै|ो|ौ|ं|ँ|्/g, "")
               .replace(/[^a-z]/g, "");
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    let searchTerm = e.target.value.trim();
    if (searchTerm === "") {
        showAllNotes();
        return;
    }

    const cleanTerm = cleanText(searchTerm);

    const filtered = data.filter(note => {
        const cleanHindi = cleanText(note.हिंदी);
        const cleanArbi  = cleanText(note.आरबी);
        const originalHindi = (note.हिंदी || "").toLowerCase();
        const originalArbi  = (note.आरबी || "").toLowerCase();

        return originalHindi.includes(searchTerm.toLowerCase()) ||
               originalArbi.includes(searchTerm.toLowerCase()) ||
               cleanHindi.includes(cleanTerm) ||
               cleanArbi.includes(cleanTerm) ||
               cleanTerm.includes(cleanHindi) ||
               cleanTerm.includes(cleanArbi);
    });

    displayResults(filtered);
});

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#e74c3c; padding:40px 10px;">कोई नोट नहीं मिला 😔</p>';
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

loadData();
