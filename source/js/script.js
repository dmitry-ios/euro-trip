'use strict'

var mainNav = document.querySelector('.main-nav--no-js')
var menuButton = document.querySelector('.main-nav__open-button')
var menuList = document.querySelector('.site-list')
var menuOptions = menuList.querySelectorAll('.site-list__link')
var detailsButtons = document.querySelectorAll('.details__button')
var modal = document.querySelector('.buy-modal')
var tariffButtons = document.querySelectorAll('.tariff__button')
var feedbackSubmit = document.querySelector('.feedback__submit')
var successTemplate = document.querySelector('#success').content
var successPopup = successTemplate.querySelector('.success')

var showSuccess = function () {
  var popup = successPopup.cloneNode(true)

  popup
    .querySelector('.success__button')
    .addEventListener('click', function () {
      clearSuccessMessage()
    })

  popup.addEventListener('mousedown', function () {
    clearSuccessMessage()
  })

  document.body.insertAdjacentElement('afterbegin', popup)
}

var clearSuccessMessage = function () {
  var popupMessage = document.querySelector('.success')
  if (popupMessage) {
    popupMessage.remove()
  }
}

mainNav.classList.remove('main-nav--no-js')

menuButton.addEventListener('click', function () {
  menuButton.classList.toggle('main-nav__open-button--closed')
  menuList.classList.toggle('site-list--show')
})

for (var i = 0; i < menuOptions.length; ++i) {
  menuOptions[i].addEventListener('click', function () {
    menuButton.classList.remove('main-nav__open-button--closed')
    menuList.classList.remove('site-list--show')
  })
}

for (var j = 0; j < detailsButtons.length; ++j) {
  detailsButtons[j].addEventListener('click', function (evt) {
    evt.preventDefault()
    modal.classList.remove('hidden')
  })
}

for (var k = 0; k < tariffButtons.length; ++k) {
  tariffButtons[k].addEventListener('click', function (evt) {
    evt.preventDefault()
    modal.classList.remove('hidden')
  })
}

var feedbackPhoneInput = document.querySelector('.feedback__input[name=phone]')
var feedbackEmailInput = document.querySelector('.feedback__input[name=email]')
var feedbackPhoneInfo = document.querySelector('.feedback__error-info--phone')
var feedbackEmailInfo = document.querySelector('.feedback__error-info--email')

var closeModal = modal.querySelector('.buy-modal__close')
var modalPhoneInput = modal.querySelector('.buy-modal__input[name=phone]')
var modalEmailInput = modal.querySelector('.buy-modal__input[name=email]')
var modalPhoneInfo = modal.querySelector('.buy-modal__error-info--phone')
var modalEmailInfo = modal.querySelector('.buy-modal__error-info--email')
var modalSubmit = modal.querySelector('.buy-modal__submit')

closeModal.addEventListener('click', function () {
  modal.classList.add('hidden')
})

var setupForm = function (
  submitButton,
  phoneInput,
  emailInput,
  phoneInfo,
  emailInfo,
  modalForm,
) {
  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    phoneInfo.classList.add('hidden')
    emailInfo.classList.add('hidden')

    var isValidPhone = phoneInput.value !== '' && phoneInput.value.length === 10
    var isValidEmail = emailInput.value !== ''

    if (!isValidPhone) {
      phoneInfo.classList.remove('hidden')
    }
    if (!isValidEmail) {
      emailInfo.classList.remove('hidden')
    }

    if (isValidPhone && isValidEmail) {
      if (modalForm) {
        modalForm.classList.add('hidden')
      }
      showSuccess()
    }
  })
}

setupForm(
  feedbackSubmit,
  feedbackPhoneInput,
  feedbackEmailInput,
  feedbackPhoneInfo,
  feedbackEmailInfo,
  null,
)
setupForm(
  modalSubmit,
  modalPhoneInput,
  modalEmailInput,
  modalPhoneInfo,
  modalEmailInfo,
  modal,
)

const detailsTabs = document.querySelector('.details__tabs')
const tabList = document.querySelector('.tab-list')

const onMouseDown = function (evt) {
  let startCoords = {
    x: evt.pageX,
  }

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    if (tabList.clientWidth <= detailsTabs.clientWidth) {
      return;
    }

    let shift = {
      x: startCoords.x - moveEvt.pageX,
    }

    startCoords = {
      x: moveEvt.pageX,
    }

    let left = window.getComputedStyle(detailsTabs, null).getPropertyValue('padding-left')
    left = +left.replace('px', '')

    let x = tabList.getBoundingClientRect().left - shift.x - left - detailsTabs.getBoundingClientRect().left

    if (x > 0) {
      x = 0;
    }
    else if (detailsTabs.clientWidth - left > tabList.clientWidth + x) {
      return;
    }

    tabList.style.left = `${x}px`
  }

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault()

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

tabList.addEventListener('mousedown', onMouseDown)
tabList.addEventListener(`ondragstart`, () => false);

const links = tabList.querySelectorAll('.tab-list__link');
const details = document.querySelector('.details');
const cards = details.querySelectorAll('.details__info');

for (let i = 0; i < links.length; ++i) {
  links[i].addEventListener('click', function (evt) {
    if (links[i].classList.contains('tab-list__link--selected')) {
      evt.preventDefault();
      return;
    }

    updateTabs(i);
  });
}

const placeList = document.querySelector('.places__list');
const places = placeList.querySelectorAll('.places__details');

for (let i = 0; i < places.length; ++i) {
  places[i].addEventListener('click', function (evt) {
    updateTabs(i);
  });
}

const updateTabs = function (index) {
  links.forEach(function (value) {
    value.classList.remove('tab-list__link--selected');
  });

  links[index].classList.add('tab-list__link--selected');

  cards.forEach(function (value) {
    value.classList.add('details__info--hidden');
  })

  cards[index].classList.remove('details__info--hidden');
};
