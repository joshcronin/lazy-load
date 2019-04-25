class Images {
    constructor() {
        this.sel = {
            elements: 'img[data-pos-src]'
        };
        this.io = null;
        // Bind this object
        this.init = this.init.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.ioCallback = this.ioCallback.bind(this);
        // Init
        this.init();
    }

    loadImage(image) {
        // Set the image src attribute to the data src
        image.src = image.dataset.posSrc;
        // Remove the data src
        image.removeAttribute('data-pos-src');
        // Stop observing this image
        this.io.unobserve(image);
    }

    ioCallback(entries) {
        // Handle each entry
        entries.forEach(entry => {
            // If the entry is in the viewport
            if (entry.isIntersecting) {
                // Load the image
                this.loadImage(entry.target);
            }
        });
    }

    init() {
        // Get all the images on the page
        let images = document.querySelectorAll(this.sel.elements);
        // If no images on the page, do nothing
        if (images.length < 0) return;
        // Create an intersection observer
        this.io = new IntersectionObserver(this.ioCallback);
        // Observe all the images on the page
        images.forEach(image => this.io.observe(image));
    }
}

export default Images;