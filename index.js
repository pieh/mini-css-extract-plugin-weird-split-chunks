function loadTemplateA() {
  import(/* webpackChunkName: "template-A" */ `./template-A.js`).then(
    ({ template }) => {
      template();
    }
  );
}

function loadTemplateB() {
  import(/* webpackChunkName: "template-B" */ `./template-B.js`).then(
    ({ template }) => {
      template();
    }
  );
}

window.loadTemplateA = loadTemplateA;
window.loadTemplateB = loadTemplateB;

loadTemplateA();

document
  .getElementById(`load-template-b`)
  .addEventListener(`click`, function () {
    loadTemplateB();
  });

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
