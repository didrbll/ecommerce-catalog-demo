export function renderProductCards(productsData, append = false) {
  const productContainer = document.querySelector('.products');
  const template = document.querySelector('#product-card-template');

  if (!append) productContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  productsData.forEach(product => {
    fragment.append(renderOneCard(product, template));
  })

  productContainer.append(fragment);
}

function renderOneCard(product, template) {
  const clone = template.content.cloneNode(true);

  const li = clone.querySelector('.products__item');
  const article = clone.querySelector('.product-card');
  const img = clone.querySelector('.product-card__image');
  const titleLink = clone.querySelector('.product-card__title a');
  const price = clone.querySelector('.product-card__price');

  li.dataset.category = product.category;
  article.dataset.productId = String(product.id);

  img.src = product.image.src;
  img.alt = product.image.alt;

  titleLink.textContent = product.title;

  price.textContent = product.price;

  return li;
}