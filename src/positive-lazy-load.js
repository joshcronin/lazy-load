import Images from './Images.js';
import Backgrounds from './Backgrounds.js';
import Videos from './Videos.js';

class PosLazyLoad {
    constructor() {
        // Bind this variable
        this.init = this.init.bind(this);
        // Wait for HTML to load before init
        document.addEventListener("DOMContentLoaded", this.init);
    }

    init() {
        this.images = new Images();
        this.backgrounds = new Backgrounds();
        this.videos = new Videos();
    }
}

new PosLazyLoad();