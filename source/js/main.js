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
