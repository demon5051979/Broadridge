var pageHeight = function () {
  var wrap = document.getElementById("page-wrap");
  if (wrap) {
    wrap.style['min-height'] = window.innerHeight + 'px';
  } 
};
pageHeight();
window.addEventListener("resize", function () {
  pageHeight();
});
