!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var o=t[e];delete t[e];var n={id:e,exports:{}};return r[e]=n,o.call(n.exports,n,n.exports),n.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){t[e]=r},e.parcelRequired7c6=o),o.register;var n=o("fJh0j"),a=o("ejkSG");let i=document.querySelector(".movie-searcher-form");document.querySelector(".gallery-cards"),i.addEventListener("submit",r=>{r.preventDefault();let t=document.querySelector(".movie-searcher-input").value;if(!t){(a&&a.__esModule?a.default:a).Notify.info("Please enter a movie name.");return}e.page=1,(0,n.searchMovie)(t,1).then(async r=>{let t=r.results;await (0,n.drawMovies)(t,e.page,r.total_pages,"searchMoviePagination")})})}();
//# sourceMappingURL=index.dac5718c.js.map