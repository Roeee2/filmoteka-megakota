document.querySelector("#input-movie").addEventListener("blur",function(e){!function(e){fetch(`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=false&language=en-US&page=1`).then(e=>e.json()).then(e=>console.log(e)).catch(e=>console.error(e))}(e.target.value)});
//# sourceMappingURL=index.0bafacf2.js.map
