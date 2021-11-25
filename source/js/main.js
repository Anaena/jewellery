'use strict';
const body = document.querySelector('body');
const mainHeaderElement = document.querySelector('.page-header');
const pageHeaderContainer = document.querySelector('.page-header__container');
const menuButtonElement = document.querySelector('.page-header__nav-toggle');
const pageHeaderNav = document.querySelector('.page-header__nav');

pageHeaderNav.classList.remove('main-nav--opened');
pageHeaderContainer.classList.remove('page-header__container--nojs');
pageHeaderContainer.classList.remove('page-header__container--active');
pageHeaderNav.classList.remove('main-nav--nojs');
pageHeaderNav.classList.add('main-nav--closed');

// Menu

menuButtonElement.addEventListener('click', () => {
  if (pageHeaderNav.classList.contains('main-nav--closed')) {
    pageHeaderNav.classList.remove('main-nav--closed');
    pageHeaderNav.classList.add('main-nav--opened');
    pageHeaderContainer.classList.add('page-header__container--active');
    body.classList.add('page__body--locked');
  } else {
    pageHeaderNav.classList.add('main-nav--closed');
    pageHeaderNav.classList.remove('main-nav--opened');
    pageHeaderContainer.classList.remove('page-header__container--active');
    body.classList.remove('page__body--locked');
  }
});

//Slider

const jewellerySlider = document.querySelector('.slider');
jewellerySlider.classList.remove('slider--nojs');

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

const accordion = document.querySelector('.accordion');
const accordionTitle = document.querySelectorAll('.accordion__title');
const accordionItem = document.querySelectorAll('.accordion__item');

accordion.classList.remove('accordion--nojs');

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
