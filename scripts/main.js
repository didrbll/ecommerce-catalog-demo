import {initHeaderScroll} from "./modules/header.js";
import {toggleMenu} from './modules/dropdown.js'
import {initDropdown} from "./modules/dropdown.js";
import {initModals} from "./modules/modal.js";
import {productsData} from "./productsData.js";
import {loadingProducts} from "./modules/loadingProducts.js";
import {filter} from "./modules/filter.js";

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  toggleMenu('navigation-toggle','navigation__menu');
  initDropdown('.navigation__link--dropdown');
  initModals();
  loadingProducts(productsData);
  filter();
});