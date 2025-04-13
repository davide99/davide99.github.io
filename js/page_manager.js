let currentPage = 0;
let pages = [];
let totalPages = 0;

function showPage(index) {
    pages.forEach((p, i) => {
        p.style.display = (i === index) ? 'block' : 'none';
    });
    currentPage = index;
    _updateUrlWithPage(index)
}

function goNext() {
    currentPage = (currentPage + 1) % totalPages;
    showPage(currentPage);
}

function goPrev() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    showPage(currentPage);
}

function _updateUrlWithPage(index) {
    const url = new URL(window.location);
    url.searchParams.set('page', index);
    history.replaceState(null, '', url);
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page'), 10);

    if (isNaN(page) || page < 0 || page > totalPages) {
        page = 0;
    }

    pages = document.querySelectorAll('.page');
    totalPages = pages.length;
    showPage(page);
});
