(()=>{var s=document.querySelector(".article-list"),u=document.getElementById("main_content"),i=document.querySelector(".show_mobToc"),n=document.querySelector(".mobtoc"),r=n.children[0];console.log(r);i.addEventListener("click",function(o){let l=0,c=80,e=null;n.style.display="block",clearInterval(e),e=setInterval(()=>{l<c?l+=10:clearInterval(e),n.style.width=l+"%"},10),o.stopPropagation()});document.documentElement.addEventListener("click",function(o){n.style.width=0+"%"});s||(i.style.display="block",m(u,r,"h2,h3"));function m(o,l,c){let e=[],d=/\s?id.+\"/;o.querySelectorAll("h2,h3").forEach(t=>{t.id&&e.push({innerText:t.innerText,id:"#"+t.id,outHtml:t.outerHTML.replace(d,"")})}),e.map(t=>{let a=`
    <li><a href=${t.id}>${t.outHtml}</a></li>
    `;l.innerHTML+=a}),console.log(e)}})();
