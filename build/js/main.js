'use strict';
const body = document.querySelector('body');
const mainHeaderElement = document.querySelector('.page-header');
const pageHeaderContainer = document.querySelector('.page-header__container');
const menuButtonElement = document.querySelector('.page-header__nav-toggle');
const pageHeaderNav = document.querySelector('.page-header__nav');

pageHeaderContainer.classList.remove('page-header__container--nojs');
pageHeaderContainer.classList.remove('page-header__container--active');
pageHeaderNav.classList.remove('main-nav--nojs');
pageHeaderNav.classList.remove('main-nav--opened');

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
