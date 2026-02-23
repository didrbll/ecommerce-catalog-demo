import { renderProductCards } from "./renderProductCards.js";

export function loadingProducts(productsData) {
  const loadButton = document.getElementById('load-more-button');
  const itemsPerPage = 4;

  let currentCategory = 'all';
  let currentItemsCount = 0;
  let currentFilteredData = productsData;

  function renderBatch(reset= false) {
    if (reset) currentItemsCount = 0;

    const nextBatch = currentFilteredData.slice(currentItemsCount, currentItemsCount + itemsPerPage);

    renderProductCards(nextBatch, !reset);

    currentItemsCount += nextBatch.length;

    if (currentItemsCount >= currentFilteredData.length) {
      loadButton.style.display = 'none';
    } else {
      loadButton.style.display = 'inline-block';
    }

    const productContainer = document.querySelector('.products');
    let emptyMessage = productContainer.querySelector('.products__empty-message');

    if (currentFilteredData.length === 0) {
      if (!emptyMessage) {
        const template = document.querySelector('#empty-message-template');

        if (template) {
          const clone = template.content.cloneNode(true);
          productContainer.append(clone);
        }
      } else {
        emptyMessage.removeAttribute('hidden')
      }
    } else if (emptyMessage) {
      emptyMessage.setAttribute('hidden', '');
    }
  }

  renderBatch();

  loadButton.addEventListener('click', () => {
    const updateUI = () => renderBatch(false);
    if (!document.startViewTransition) updateUI();
    else document.startViewTransition(updateUI);
  })

  document.addEventListener('categoryChanged', (e) => {
    currentCategory = e.detail;

    if (currentCategory === 'all') {
      currentFilteredData = productsData;
    } else {
      currentFilteredData = productsData.filter(product => product.category === currentCategory);
    }

    const updateUI = () => renderBatch(true);
    if (!document.startViewTransition) updateUI();
    else document.startViewTransition(updateUI);
  });

}
