var e,t,n,o,d;t={},n={},null==(o=(e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired7c6)&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var d={id:e,exports:{}};return t[e]=d,o.call(d.exports,d,d.exports),d.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o.register,d=o("fJh0j"),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("filmModal"),t=document.querySelector("ul.gallery-cards"),n=()=>{e&&(e.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.querySelector(".backdrop").addEventListener("click",l),document.addEventListener("keydown",i))},o=()=>{e&&(e.classList.add("is-hidden"),document.body.style.overflow="",document.querySelector(".backdrop").removeEventListener("click",l),document.removeEventListener("keydown",i))},i=e=>{"Escape"===e.key&&o()},l=e=>{document.querySelector(".modal-content").contains(e.target)||o()},r=document.querySelector(".modal-close-button");r&&(r.onclick=o),t.addEventListener("click",async e=>{if("IMG"===e.target.tagName){let t=e.target.id.split("-")[1],o=await (0,d.getFilmData)(t);o&&(c(o),n())}});let c=e=>{document.getElementById("cover-image").src=`https://image.tmdb.org/t/p/original${e.poster_path}`,document.getElementById("movie-title").innerText=e.original_title,document.getElementById("film-votes").innerText=e.vote_average.toFixed(1),document.getElementById("film-votes-secondary").innerText=e.vote_count,document.getElementById("film-popularity").innerText=Math.round(e.popularity),document.getElementById("film-original-title").innerText=e.original_title,document.getElementById("film-genre").innerText=e.genres.map(e=>e.name).join(", "),document.getElementById("film-description").innerHTML=`<h3>ABOUT</h3><p>${e.overview}</p>`},a=document.querySelector(".modal-buttons button:nth-child(1)"),m=document.querySelector(".modal-buttons button:nth-child(2)");a&&(a.onclick=()=>{console.log("Added to watched")}),m&&(m.onclick=()=>{console.log("Added to queue")})});
//# sourceMappingURL=index.7896f050.js.map
