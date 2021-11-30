'use strict';
const BODY = document.querySelector('body');

const pageHeaderContainer = document.querySelector('.page-header__container');
const menuButtonElement = document.querySelector('.page-header__nav-toggle');
const headerNavigation = document.querySelector('.page-header__nav');
const pageMain = document.querySelector('.page-main');

pageMain.classList.remove('no-js');
pageHeaderContainer.classList.remove('page-header__container--nojs');
pageHeaderContainer.classList.remove('page-header__container--active');
headerNavigation.classList.remove('main-nav--opened');
headerNavigation.classList.remove('main-nav--nojs');
headerNavigation.classList.add('main-nav--closed');

// Menu

const menuButtonHandler = () => {
  if (headerNavigation.classList.contains('main-nav--closed')) {
    headerNavigation.classList.remove('main-nav--closed');
    headerNavigation.classList.add('main-nav--opened');
    pageHeaderContainer.classList.add('page-header__container--active');
    BODY.classList.add('page__body--locked');
  } else {
    headerNavigation.classList.add('main-nav--closed');
    headerNavigation.classList.remove('main-nav--opened');
    pageHeaderContainer.classList.remove('page-header__container--active');
    BODY.classList.remove('page__body--locked');
  }
};

menuButtonElement.addEventListener('click', menuButtonHandler);

// Popup

const popup = document.querySelector('.popup');
const loginLink = document.querySelector('.page-header__login-link');
const closePopupButton = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
    closeFilter();
  }
};

const hideModal = (evt) => {
  if (evt.target === popup || evt === filter) {
    closeModal();
    closeFilter();
  }
};

// Form

const loginLogin = document.querySelector('[name="login"]');
const loginPassword = document.querySelector('[name="password"]');
const itemForm = document.querySelectorAll('.form__item');

let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('login');
} catch (err) {
  isStorageSupport = false;
}

const onFormSubmit = (evt) => {
  if (!loginLogin.value || !loginPassword.value) {
    evt.preventDefault();
    popup.classList.remove('popup-error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('popup-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('login', loginLogin.value);
    }
  }
};

const closeModal = () => {
  popup.classList.remove('popup--show');
  BODY.classList.remove('page__body--locked');
  popupForm.reset();
  itemForm.forEach((item) => {
    item.classList.remove('form__item--error');
  });
  popup.removeEventListener('click', hideModal);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openModal = (evt) => {
  evt.preventDefault();
  popup.classList.add('popup--show');
  BODY.classList.add('page__body--locked');
  document.addEventListener('click', hideModal);
  document.addEventListener('keydown', onPopupEscKeydown);
  if (storage) {
    loginLogin.value = storage;
    loginPassword.focus();
  } else {
    loginLogin.focus();
  }
};

const switchPopupElement = (evt) => {
  const modal = evt.target.closest('.popup');
  const elements = [...modal.querySelector('form').elements];

  if (evt.key === 'Tab') {
    if (evt.shiftKey) {
      if (evt.target === elements[0]) {
        evt.preventDefault();
        closePopupButton.focus();
      }
    } else {
      if (evt.target === closePopupButton) {
        evt.preventDefault();
        elements[0].focus();
      }
    }
  }
};

if (popup) {
  popup.addEventListener('keydown', switchPopupElement);
}

if (loginLink) {
  loginLink.addEventListener('click', openModal);
}

if (closePopupButton) {
  closePopupButton.addEventListener('click', closeModal);
}

popupForm.addEventListener('submit', onFormSubmit);

// Filter
const filter = document.querySelector('.filters__wrapper');
const filtersOpenButton = document.querySelector('.filters__open-button');
const filtersCloseButton = document.querySelector('.filters__close-button');

const closeFilter = () => {
  filter.classList.remove('filters__wrapper--show');
  BODY.classList.remove('page__body--locked');
  filter.removeEventListener('click', hideModal);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openFilter = () => {
  filter.classList.add('filters__wrapper--show');
  BODY.classList.add('page__body--locked');
  document.addEventListener('click', hideModal);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const switchFilterElement = (evt) => {
  const filters = evt.target.closest('.filters');
  const elements = [...filters.querySelector('form').elements];

  if (evt.key === 'Tab') {
    if (evt.shiftKey) {
      if (evt.target === elements[0]) {
        evt.preventDefault();
        filtersOpenButton.focus();
      }
    } else {
      if (evt.target === filtersOpenButton) {
        evt.preventDefault();
        elements[0].focus();
      }
    }
  }
};

if (filter) {
  filter.addEventListener('keydown', switchFilterElement);
}

if (filtersOpenButton) {
  filtersOpenButton.addEventListener('click', openFilter);
}

if (filtersCloseButton) {
  filtersCloseButton.addEventListener('click', closeFilter);
}

// Accordion
const accordionItem = document.querySelectorAll('.accordion__item');
const accordionTitle = document.querySelectorAll('.accordion__title');
const accordionFilterItem = document.querySelectorAll('.accordion__fieldset');
const accordionFilterTitle = document.querySelectorAll('.accordion__filter-title');

if (accordionTitle) {
  accordionTitle.forEach((item) =>
    item.addEventListener('click', () => {
      const parent = item.parentNode;

      if (parent.classList.contains('accordion__item--active')) {
        parent.classList.remove('accordion__item--active');
      } else {
        accordionItem.forEach((child) =>
          child.classList.remove('accordion__item--active'));
        parent.classList.toggle('accordion__item--active');
      }
    })
  );
}

if (accordionFilterTitle) {
  accordionFilterTitle.forEach((item) =>
    item.addEventListener('click', () => {
      const parent = item.parentNode;

      if (parent) {
        parent.classList.toggle('accordion__fieldset--active');
      } else {
        accordionFilterItem.forEach((child) =>
          child.classList.remove('accordion__fieldset--active'));
        parent.classList.toggle('accordion__fieldset--active');
      }
    })
  );
}

// Slider

const makeSlidesCounter = () => {
  const countCurrent = $('.counter__current');
  const countTotal = $('.counter__total');
  const currentSlide = $('.pagination__list li').index($('.pagination__list .slick-active'));
  const totalPages = $('.pagination__list').children().length;
  countCurrent.text(currentSlide + 1);
  countTotal.text(totalPages);
};

$('.slider__list').slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
  dots: true,
  swipe: false,
  prevArrow: '.slider__button--prev',
  nextArrow: '.slider__button--next',
  appendDots: '.slider__pagination',
  dotsClass: 'pagination__list',

  responsive: [{
    breakpoint: 1024,
    settings: {
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: true,
      dots: true,
      swipe: true,
    },
  }, {
    breakpoint: 768,
    settings: {
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,
      dots: true,
      swipe: true,
    },
  }],
}).slick('refresh');
$('.slider__list').on('afterChange', makeSlidesCounter);
