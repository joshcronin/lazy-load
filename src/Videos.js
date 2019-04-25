class Videos {
    constructor() {
        this.sel = {
            elements: 'source[data-pos-src]'
        };
        this.io = null;
        // Bind this object
        this.init = this.init.bind(this);
        this.loadVideo = this.loadVideo.bind(this);
        this.ioCallback = this.ioCallback.bind(this);
        // Init
        this.init();
    }

    loadVideo(video) {
        // Get the source elements
        let sources = video.querySelectorAll(this.sel.elements);
        // Loop over each source
        sources.forEach(source => {
            // Set the image src attribute to the data src
            source.src = source.dataset.posSrc;
            // Remove the data src
            source.removeAttribute('data-pos-src');
        });
        // Remove the lazy load flag from the video
        video.removeAttribute('data-pos-lzy');
        // Load the video
        video.load();
        // Stop observing this image
        this.io.unobserve(video);
    }

    ioCallback(entries) {
        // Handle each entry
        entries.forEach(entry => {
            // If the entry is in the viewport
            if (entry.isIntersecting) {
                // Load the image
                this.loadVideo(entry.target);
            }
        });
    }

    init() {
        // Get all the images on the page
        let sources = document.querySelectorAll(this.sel.elements);
        // If no images on the page, do nothing
        if (sources.length < 0) return;
        // Create an intersection observer
        this.io = new IntersectionObserver(this.ioCallback);
        // Loop over all videos on the page
        document.querySelectorAll('video').forEach(video => {
            // If there are no lazy loading sources in this video, skip it
            if (video.querySelectorAll(this.sel.elements).length < 0) return;
            // Observe this video
            this.io.observe(video);
        });
    }
}

export default Videos;