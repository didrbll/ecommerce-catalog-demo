export function toggleMenu(toggleId, navId) {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () =>{
    nav.classList.toggle('show-menu')
    toggle.classList.toggle('show-icon')
    document.documentElement.classList.toggle('is-locked')
  })

  document.addEventListener('click', (e) => {
    if(nav && !nav.contains(e.target) && !toggle.contains(e.target)){
      nav.classList.remove('show-menu')
      toggle.classList.remove('show-icon')
      document.documentElement.classList.remove('is-locked')
    }
  })
}

export function initDropdown(dropdownId) {
  const dropdownMenus = document.querySelectorAll(dropdownId)

  dropdownMenus.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 1023.98px)').matches) {
        e.preventDefault()
        const parent = dropdown.parentElement
        parent.classList.toggle('show-dropdown')
      }
    })
  })
}