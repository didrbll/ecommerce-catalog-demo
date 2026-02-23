export function filter() {
  const filterList = document.querySelector('.filter-category');
  const filterButtons = filterList.querySelectorAll('.filter-category__button');

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const filterValue = e.currentTarget.getAttribute('data-filter');
      const buttonElement = e.currentTarget;

      const performUpdate = () => {
        updateActiveButton(buttonElement);

        document.dispatchEvent(new CustomEvent('categoryChanged', { detail: filterValue }));
      }

      if (!document.startViewTransition) {
        performUpdate();
      } else {
        document.startViewTransition(performUpdate);
      }
    })
  })


  function updateActiveButton(newButton) {
    filterList.querySelector('.is-active').classList.remove('is-active');
    newButton.classList.add('is-active');
  }

}

