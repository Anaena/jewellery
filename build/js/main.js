'use strict';
const BODY = document.querySelector('body');
const PAGEHEADERCONTAINER = document.querySelector('.page-header__container');
const MENUBUTTONELEMENT = document.querySelector('.page-header__nav-toggle');
const HEADERNAVIGATION = document.querySelector('.page-header__nav');
const PAGEMAIN = document.querySelector('.page-main');
const FILTER = document.querySelector('.filters__wrapper');
const FILTEROPENBUTTON = document.querySelector('.filters__open-button');
const FILTERCLOSEBUTTON = document.querySelector('.filters__close-button');

PAGEMAIN.classList.remove('no-js');
PAGEHEADERCONTAINER.classList.remove('page-header__container--nojs');
PAGEHEADERCONTAINER.classList.remove('page-header__container--active');
HEADERNAVIGATION.classList.remove('main-nav--opened');
HEADERNAVIGATION.classList.remove('main-nav--nojs');
HEADERNAVIGATION.classList.add('main-nav--closed');

// Menu

const menuButtonHandler = () => {
  if (HEADERNAVIGATION.classList.contains('main-nav--closed')) {
    HEADERNAVIGATION.classList.remove('main-nav--closed');
    HEADERNAVIGATION.classList.add('main-nav--opened');
    PAGEHEADERCONTAINER.classList.add('page-header__container--active');
    BODY.classList.add('page__body--locked');
  } else {
    HEADERNAVIGATION.classList.add('main-nav--closed');
    HEADERNAVIGATION.classList.remove('main-nav--opened');
    PAGEHEADERCONTAINER.classList.remove('page-header__container--active');
    BODY.classList.remove('page__body--locked');
  }
};

MENUBUTTONELEMENT.addEventListener('click', menuButtonHandler);

// Popup

// const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// const onPopupEscKeydown = (evt) => {
//   if (isEscEvent(evt)) {
//     evt.preventDefault();
//     closeModal();
//   }
// };

// const hideModal = (evt) => {
//   if (evt.target === POPUP || evt === FILTER) {
//     closeModal();
//     closeFilter();
//   }
// };

// Filter

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // closeModal();
    closeFilter();
  }
};

const hideModal = (evt) => {
  if (evt.target === POPUP || evt === FILTER) {
    // closeModal();
    closeFilter();
  }
};

const closeFilter = () => {
  FILTER.classList.remove('filters__wrapper--show');
  BODY.classList.remove('page__body--locked');
  FILTER.removeEventListener('click', hideModal);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openFilter = () => {
  FILTER.classList.add('filters__wrapper--show');
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
        FILTERCLOSEBUTTON.focus();
      }
    } else {
      if (evt.target === FILTERCLOSEBUTTON) {
        evt.preventDefault();
        elements[0].focus();
      }
    }
  }
};

if (FILTER){
  FILTER.addEventListener('keydown', switchFilterElement);
}

if (FILTEROPENBUTTON){
  FILTEROPENBUTTON.addEventListener('click', openFilter);
}

if (FILTERCLOSEBUTTON){
  FILTERCLOSEBUTTON.addEventListener('click', closeFilter);
}

//Slider
const jewellerySlider = document.querySelector('.slider');

const makeSlidesCounter = () =>{
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

// Accordion
const accordionBlocks = document.querySelectorAll('.accordion');
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
