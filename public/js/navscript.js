const nav=document.querySelector("nav");
const features = document.querySelector(".features");
// console.log(features);
    window.addEventListener("scroll",function() {
     //console.log(features.getBoundingClientRect().top);
      let pos = features.getBoundingClientRect().top;
      if(pos<0)
      nav.setAttribute("class", "sticky");
     else
     nav.removeAttribute("class", "sticky");
    });