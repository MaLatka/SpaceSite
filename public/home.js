$(window).on("load", () => {
  setTimeout(() => {
    changeOpacity(".content-container");
  }, 500);
  setTimeout(() => {
    $.when(typeWriter()).then(
      setTimeout(() => {
        changeOpacity(".link-wrapper");
      }, 2000)
    );
  }, 3000);
});

setTimeout(changeOpacity(".img-wrapper"), 500);

function changeOpacity(el) {
  $(el).addClass("animate-opacity");
}

let i = 0;
const txt = "Check out NASA's Astronomy Photo of the Day"; /* The text */
const speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
