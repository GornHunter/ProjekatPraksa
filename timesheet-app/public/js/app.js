$(function () {
  var $body = $("body");

  //----------  Close on click Outside of Container
  //------------------------------------------------------------------------------
  function clickOutsideContainer(selector, container, callback) {
    selector.on("mouseup", function (e) {
      e.stopPropagation();
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        callback();
      }
    });
  }

  //----------  Close on clicking submit button
  //------------------------------------------------------------------------------
  function clickSubmitButton(selector, container, callback) {
    selector.on("click", function (e) {
      e.stopPropagation();
      if (container.is(e.target) && container.has(e.target).length === 0) {
        callback();
      }
    });
  }

  //----------  Modal
  //------------------------------------------------------------------------------
  function modal() {
    var modalInit = $(".js-modal-init");
    var modalInner = $(".js-modal-inner");
    var modalSel = $(".js-modal");
    var modalShowClass = "is-visible";
    var btnClick = $("#close");

    modalInit.on("click", function () {
      modalSel.addClass(modalShowClass);
    });

    function closeModal() {
      modalSel.removeClass(modalShowClass);
    }

    clickOutsideContainer($body, modalInner, closeModal);
    clickSubmitButton($body, btnClick, closeModal);
  }

  modal();
});
