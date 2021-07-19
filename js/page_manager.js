class PageManager {
    constructor(last_page){
        this.page = 0; //current page
        this.last_page = last_page;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("page"))
            this.page = parseInt(urlParams.get("page"));

        var pm = this;

        window.addEventListener("DOMContentLoaded", function(event) {
            pm._showPage();
        });
    }

    nextPage() {
        if (this.page === this.last_page)
            this.page = 0;
        else
            this.page++;
        
        this._showPage();
    }

    prevPage() {
        if (this.page === 0)
            this.page = this.last_page;
        else
            this.page--;
        
        this._showPage();
    }

    _showPage() {
        var pm = this;

        Array.from(document.getElementsByClassName("page")).forEach(function(element, index, array) {
            if(index === pm.page) {
                element.style.display = "block";
                if(index !== 0)
                    window.history.pushState({page: index}, "", "?page=" + index);
                else
                    window.history.pushState({}, "", window.location.href.substring(0, window.location.href.lastIndexOf('?')));
            } else {
                element.style.display = "none";
            }
        });
    }
}
