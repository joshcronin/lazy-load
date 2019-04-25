// import '../node_modules/intersection-observer/intersection-observer.js';
import Images from './Images';
import Backgrounds from './Backgrounds';
import Videos from './Videos';

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