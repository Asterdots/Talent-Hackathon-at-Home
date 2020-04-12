// Modules
import Glide from '@glidejs/glide';
import axios from 'axios';

// Carousel functionality
let glide = new Glide('.glide', { 
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 3000
});
glide.mount();

let banner = new Glide('.glide__carousel', { autoplay: 7500 });
banner.mount();

// API functionality