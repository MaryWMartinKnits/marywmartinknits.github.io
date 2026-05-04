document.querySelectorAll(".video-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
        const videoId = this.dataset.videoId;

        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "560");
        iframe.setAttribute("height", "315");
        iframe.setAttribute(
            "src",
            `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`,
        );
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        );
        iframe.setAttribute("allowfullscreen", "");

        this.innerHTML = "";
        this.appendChild(iframe);
    });
});
