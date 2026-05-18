let data = [];

async function loadData() {
    const response = await fetch('data.json');
    data = await response.json();
    showAllNotes();
}

function showAllNotes() {
    displayResults(data);
}

function normalize(str) {
    if (!str) return "";
    return str.toLowerCase()
              .replace(/़|ा|ी|ू|े|ै|ो|ौ|ं|ँ|्/g, "")
              .replace(/[^a-z]/g, "");
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    let term = e.target.value.trim();
    if (term === "") {
        showAllNotes();
        return;
    }

    term = normalize(term);

    const filtered = data.filter(note => {
        const h = normalize(note.हिंदी || "");
        const a = normalize(note.आरबी || "");

        return h.includes(term) || a.includes(term) ||
               term.includes(h) || term.includes(a) ||
               h.includes(term.slice(0, Math.floor(term.length * 0.7))) ||
               a.includes(term.slice(0, Math.floor(term.length * 0.7)));
    });

    displayResults(filtered);
});

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#e74c3c; padding:40px 10px;">कोई नोट नहीं मिला 😔</p>`;
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
