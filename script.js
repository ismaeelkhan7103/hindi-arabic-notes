let data = [];

async function loadData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        showAllNotes();
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function showAllNotes() {
    displayResults(data);
}

// Advanced Normalization
function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase()
               .trim()
               .replace(/़/g, '')
               .replace(/[ाीूूेैोौंँ]/g, '')
               .replace(/्/g, '')
               .replace(/ख़|ग़|ज़|ड़|ढ़|फ़/g, m => m[0])
               .replace(/[^a-z0-9]/g, '');   // Remove all special chars
}

// Fuzzy Match Function
function fuzzyMatch(str, term) {
    if (!str || !term) return false;
    str = normalizeText(str);
    term = normalizeText(term);
    
    if (str.includes(term) || term.includes(str)) return true;
    
    // Partial word match
    const strWords = str.split(' ');
    const termWords = term.split(' ');
    
    return termWords.every(tWord => 
        strWords.some(sWord => sWord.includes(tWord) || tWord.includes(sWord))
    );
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.trim();
    
    if (term === '') {
        showAllNotes();
        return;
    }

    const filtered = data.filter(note => {
        const hindi = note.हिंदी || "";
        const arbi  = note.आरबी || "";
        
        return fuzzyMatch(hindi, term) || 
               fuzzyMatch(arbi, term) ||
               hindi.toLowerCase().includes(term.toLowerCase()) ||
               arbi.toLowerCase().includes(term.toLowerCase());
    });

    displayResults(filtered);
});

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#e74c3c; padding:30px 10px;">
            कोई नोट नहीं मिला 😔<br>
            <small>अलग spelling से ट्राई करें</small>
        </p>`;
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
