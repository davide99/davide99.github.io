function initPager(starting_page, last_page) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("page"))
        page = parseInt(urlParams.get("page"));

    window.last_page = parseInt(last_page);
    window.page = parseInt(starting_page);
}

function nextPage() {
    if (page === last_page)
        page = 0;
    else
        page++;
}

function prevPage() {
    if (page === 0)
        page = last_page;
    else
        page--;
}

function showPage() {
    Array.from(document.getElementsByClassName("page")).forEach(function(element, index, array) {
        if(index === page) {
            element.style.display = "block";
            if(index !== 0)
                window.history.pushState({page: index}, "", "?page=" + index);
        } else {
            element.style.display = "none";
        }
    });
}

window.addEventListener("DOMContentLoaded", function(event) {
    showPage();
});