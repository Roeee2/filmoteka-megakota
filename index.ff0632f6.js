document.addEventListener("DOMContentLoaded",()=>{let e=()=>{let e=document.getElementById("filmModal");e&&e.classList.remove("is-hidden")},t=document.getElementById("film-card");t&&(t.onclick=e);let n=document.querySelector(".modal-close-button");n&&(n.onclick=function(){let e=document.getElementById("filmModal");e&&e.classList.add("is-hidden")});let o=document.getElementById("cover-image");o&&(o.src="./images/film@1x.jpg"),e(),function(){document.getElementById("cover-image").src="../images/film@1x.jpg",document.getElementById("movie-title").innerText="A FISTFUL OF LEAD";let e=document.getElementById("film-votes"),t=document.getElementById("film-votes-secondary"),n="7.3  1260".split(" ");e.innerText=n[0],t.innerText=n[1]||"N/A",e.classList.add("film-votes"),t.classList.add("film-votes-secondary"),document.getElementById("film-popularity").innerText="100.2",document.getElementById("film-original-title").innerText="A FISTFUL OF LEAD",document.getElementById("film-genre").innerText="Western",document.getElementById("film-description").innerHTML=`ABOUT<p>${"ABOUT  Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how?".split("ABOUT")[1].trim()}</p>`}()});
//# sourceMappingURL=index.ff0632f6.js.map