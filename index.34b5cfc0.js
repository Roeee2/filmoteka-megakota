var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var d={id:e,exports:{}};return t[e]=d,n.call(d.exports,d,d.exports),d.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n),n.register;var d=n("7EEHk"),i=n("2ix2C");document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("filmModal"),t=document.querySelector("ul.gallery-cards"),o={},n=()=>{e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.querySelector(".backdrop").addEventListener("click",a),document.addEventListener("keydown",l))},r=()=>{e&&(e.classList.add("is-hidden"),document.body.style.overflow="",document.querySelector(".backdrop").removeEventListener("click",a),document.removeEventListener("keydown",l))},l=e=>{"Escape"===e.key&&r()},a=e=>{document.querySelector(".modal").contains(e.target)||r()},c=document.querySelector(".modal-close-button");c&&(c.onclick=r),t.addEventListener("click",async e=>{if("IMG"===e.target.tagName){let t=e.target.id.split("-")[1],i=await (0,d.getFilmData)(t);i&&(o=i,m(i),n())}});let m=e=>{document.getElementById("cover-image").src=`https://image.tmdb.org/t/p/original${e.poster_path}`,document.getElementById("movie-title").innerText=e.original_title,document.getElementById("film-votes").innerText=e.vote_average.toFixed(1),document.getElementById("film-votes-secondary").innerText=e.vote_count,document.getElementById("film-popularity").innerText=Math.round(e.popularity),document.getElementById("film-original-title").innerText=e.original_title,document.getElementById("film-genre").innerText=e.genres.map(e=>e.name).join(", "),document.getElementById("film-description").innerHTML=`<h3>ABOUT</h3><p>${e.overview}</p>`},s=document.querySelector(".modal-buttons button:nth-child(1)"),u=document.querySelector(".modal-buttons button:nth-child(2)");s&&(s.onclick=()=>{if(localStorage.setItem(`watched.${o.id}`,JSON.stringify(o)),(0,d.isUserEmailStored)()){let e=localStorage.getItem("userEmail");i.addWatchedToUser(e,o).then(e=>{console.log(`Added to watched in firestroe: ${e}`)})}}),u&&(u.onclick=()=>{if(localStorage.setItem(`queue.${o.id}`,JSON.stringify(o)),(0,d.isUserEmailStored)()){let e=localStorage.getItem("userEmail");i.addQueueToUser(e,o).then(e=>{console.log(`Added to queue in firestroe: ${e}`)})}})});
//# sourceMappingURL=index.34b5cfc0.js.map