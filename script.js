(function () {
  "use strict";

  // Smooth scroll for in-page nav links
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Nav highlight: add .active to link when its section is in view
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function setActiveLink() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var headerHeight = document.querySelector(".site-header").offsetHeight;
    var firstSection = sections[0];
    var firstTop = firstSection ? firstSection.offsetTop - headerHeight : 0;

    if (scrollY < firstTop && navLinks[0]) {
      navLinks.forEach(function (a, i) {
        a.classList.toggle("active", i === 0);
      });
      return;
    }

    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      if (!id) return;
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      var bottom = top + height;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);

  // Back to top: show when scrolled down, hide at top
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    function toggleBackToTop() {
      if (window.pageYOffset > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", toggleBackToTop);
    window.addEventListener("load", toggleBackToTop);

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("main-content").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
