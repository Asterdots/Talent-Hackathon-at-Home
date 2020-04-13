// Modules
import axios from 'axios';

// API functionality
const ID = "WavvLdfdP6g8aZTtbBQHTw";
const URL_PROVIDER = `https://api.yelp.com/v3/businesses/${ID}`;
// CORS Proxy Route

const banner_img = document.getElementsByClassName("img__1");

// const refill = () => {
//     try {
//         // let res = await axios.get(URL_PROVIDER);
//         // console.log(res.data);
//         let res = fetch(URL_PROVIDER, { mode: 'cors', headers: {'Access-Control-Allow-Origin':'*'}})
//             .then((input) => console.log(input))
//             .catch((input) => console.log(`ERROR BY - ${input}`))
//     } catch {
//         console.log("An error ocurred");
//     }
//     // let data = JSON.parse(res.data);

//     // banner_img.src = data["img_url"];
//     // console.log(data["img_url"]);
// }

// window.onload(refill());