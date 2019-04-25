class Backgrounds {
    constructor() {
        this.sel = {
            elements: '[data-pos-bg-src]'
        };
        this.io = null;
        // Bind this object
        this.init = this.init.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.ioCallback = this.ioCallback.bind(this);
        // Init
        this.init();
    }

    isJson(string) {
        try {
            JSON.parse(string);
        } catch(e) {
            return false;
        }
        return true;
    }

    loadImage(image) {
        // Get the background data
        let bgData = image.dataset.posBgSrc;
        // If the data is a JSON string
        if (this.isJson(bgData)) {
            // Get the element ID
            let imageId = image.getAttribute('id');
            // If there is no ID
            if (imageId == null || imageId == '') {
                // Generate random ID
                imageId = '_' + Math.random().toString(36).substr(2, 9);
                // Set the ID on the element
                image.setAttribute('id', imageId);
            }
            // Get object
            bgData = JSON.parse(bgData);
            // Sort to mobile first
            bgData.sort((a, b) => {
                if (a.bp < b.bp) return -1;
                if (a.bp > b.bp) return 1;
                return 0;
            });
            // Create the string for styles
            let styleString = '<style>';
            // Loop over each background image
            bgData.forEach(background => {
                // Add a media query for this background image
                styleString += "@media screen and (min-width:" + background.bp + "px){#" + imageId + "{background-image:url(" + background.url + ");}}";
            });
            // Close the style tag
            styleString += '</style>';
            // Insert the style tag before the element
            image.insertAdjacentHTML('beforebegin', styleString);
        } else {// If not JSON
            // Set the background image
            image.style.backgroundImage = 'url(' + bgData + ')';
        }
        // Remove the data bg src
        image.removeAttribute('data-pos-bg-src');
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

export default Backgrounds;