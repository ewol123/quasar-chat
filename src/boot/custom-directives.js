export default ({ Vue }) => {
  Vue.directive("hover-shadow", {
    bind(el) {
      el.style.transition = "0.2s";

      function mouseover() {
        el.classList.add("shadow-10");
      }

      function mouseout() {
        el.classList.remove("shadow-10");
      }

      el.addEventListener("mouseover", mouseover, false);
      el.addEventListener("mouseout", mouseout, false);
    }
  });
};
