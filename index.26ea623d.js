var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},r={},l=e.parcelRequired7c6;null==l&&((l=function(e){if(e in i)return i[e].exports;if(e in r){var l=r[e];delete r[e];var t={id:e,exports:{}};return i[e]=t,l.call(t.exports,t,t.exports),t.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,i){r[e]=i},e.parcelRequired7c6=l),l.register;var t=l("7EEHk"),n=l("1GAPJ");const o=document.querySelector(".movie-searcher-form"),a=document.querySelector(".gallery-cards");o.addEventListener("submit",e=>{e.preventDefault();let i=document.querySelector(".movie-searcher-input").value;if(!i){(n&&n.__esModule?n.default:n).Notify.info("Please enter a movie name.");return}console.log(i),a.innerHTML="",page=1,(0,t.searchMovie)(i,page).then(async e=>{for(let i of e.results){let{id:e,poster_path:r,original_title:l,genre_ids:n,release_date:o}=i,s=o?o.split("-")[0]:"Unknown",d=await (0,t.makeGenresString)(n),c=`
        <li class="film-card" id="film-card-${e}">
          <div class="film-cover">
            <img class="film-img" id="film-${e}" 
            src="https://image.tmdb.org/t/p/original${r}" 
            alt="${l}">
          </div>
          <div class="film-desc">
            <p class="card-film-title">${l}</p>
            <p class="film-info">${d} | ${s}</p>
          </div>
        </li>`;a.insertAdjacentHTML("beforeend",c)}})});
//# sourceMappingURL=index.26ea623d.js.map
