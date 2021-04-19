window.addEventListener("load", function(event) {
    if (localStorage.getItem("scroll_position_y") != null) {
        window.scrollTo(0, localStorage.getItem("scroll_position_y"));
    }

    window.onscroll = function() {
        localStorage.setItem("scroll_position_y", window.scrollY);
    };
});