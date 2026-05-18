let data = [];

async function loadData() {
    const response = await fetch('data.json');
    data = await response.json();
    showAllNotes();
}

function showAllNotes() {
    displayResults(data);
}

// Basic + Smart Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.trim();
    if (term === "") {
        showAllNotes();
        return;
    }

    const lowerTerm = term.toLowerCase();

    const filtered = data.filter(note => {
        const hindi = (note.हिंदी || "").toLowerCase();
        const arbi  = (note.आरबी || "").toLowerCase();

        // Original match
        if (hindi.includes(lowerTerm) || arbi.includes(lowerTerm)) {
            return true;
        }

        // Clean version for English typing
        const cleanHindi = hindi.replace(/़|ा|ी|ू|े|ै|ो|ौ|ं|ँ|्/g, "");
        const cleanArbi  = arbi.replace(/़|ा|ी|ू|े|ै|ो|ौ|ं|ँ|्/g, "");
        const cleanTerm  = lowerTerm.replace(/़|ा|ी|ू|े|ै|ो|ौ|ं|ँ|्/g, "");

        return cleanHindi.includes(cleanTerm) || 
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
        container.innerHTML = '<p style="text-align:center; color:#e74c3c; padding:40px 10px;">कोई नोट नहीं मिला 😔<br><small>अलग spelling ट्राई करें</small></p>';
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
