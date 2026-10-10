let currentPage = 0;
let pages = [];
let totalPages = 0;

function showPage(index) {
    pages.forEach((p, i) => {
        p.style.display = (i === index) ? 'block' : 'none';
    });
    currentPage = index;
    _updateNotes(index);
    _updateUrlWithPage(index);
}

function goNext() {
    currentPage = (currentPage + 1) % totalPages;
    showPage(currentPage);
}

function goPrev() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    showPage(currentPage);
}

function _updateNotes(index) {
    const section = document.getElementById('notes');
    if (!section) return;

    let visible = 0;
    section.querySelectorAll('.footnote').forEach(n => {
        const m = /^fn-(\d+)-/.exec(n.id);          // "fn-0-1" -> 0
        const show = m !== null && parseInt(m[1], 10) === index;
        n.style.display = show ? 'block' : 'none';
        if (show) visible++;
    })

    section.style.display = visible > 0 ? 'block' : 'none';
}

function _updateUrlWithPage(index) {
    const url = new URL(window.location);
    url.searchParams.set('page', index);
    history.replaceState(null, '', url);
}

window.addEventListener('DOMContentLoaded', () => {
    pages = document.querySelectorAll('.page');
    totalPages = pages.length;

    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page'), 10);

    if (isNaN(page) || page < 0 || page >= totalPages) {
        page = 0;
    }

    showPage(page);
});
