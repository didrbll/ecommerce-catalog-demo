export function initModals() {
  const state = {
    isAutoShown: false,
    isFormSubmitted: false,
    timerId: null
  };

  const dialog = document.getElementById('app-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogBody = document.getElementById('dialog-body');
  const openButton = document.getElementById('open-dialog');
  const closeButton = document.getElementById('close-dialog')
  const footerTrigger = document.getElementById('footer-trigger');

  const templates = {
    clickContactUs: {
      title: 'Wanna say hi?',
      html: `<div class="dialog__text">
            <p>We’re always happy to hear from you</p>
          </div>
          <form class="dialog__form subscribe-form" id="dialog-form">
            <h3 class="visually-hidden">Contact us</h3>
            <div class="subscribe-form__field">
              <label for="subscribe-name" class="subscribe-form__label visually-hidden">Name</label>
              <input id="subscribe-name"
                     name="name"
                     type="text"
                     class="subscribe-form__input"
                     placeholder="John Doe"
                     autocomplete="name"
                     autocapitalize="sentences"
              >
            </div>
            <div class="subscribe-form__field">
              <label for="subscribe-email" class="subscribe-form__label visually-hidden">Email</label>
              <input id="subscribe-email"
                     name="email"
                     type="email"
                     class="subscribe-form__input"
                     placeholder="email@address.com"
                     required
                     autocomplete="email"
                     autocapitalize="none"
              >
            </div>
            <div class="subscribe-form__field">
              <label for="subscribe-message" class="subscribe-form__label visually-hidden">Message</label>
              <textarea name="message"
                        id="subscribe-message"
                        class="subscribe-form__input subscribe-form__input--textarea"
                        required
                        autocapitalize="sentences"
                        placeholder="Hi! I have something great to share!"></textarea>
            </div>
            <button type="submit" class="button subscribe-form__submit">Get In Touch</button>
          </form>`,
    },
    success: {
      title: 'Thank you!',
      html: `<div class="dialog__text">
              <p>Your message has been successfully sent. We will contact you as soon as possible.</p>
            </div>`,
    },
    timer: {
      title: 'Admit it, you want this',
      html: `<div class="dialog__text">
            <p>Drop your email and grab <b>15% off</b>. No more playing hard to get.</p>
          </div>
          <form class="dialog__form subscribe-form" id="dialog-form">
            <h3 class="visually-hidden">Subscribe</h3>
            <div class="subscribe-form__field">
              <label for="subscribe-email" class="subscribe-form__label visually-hidden">Email</label>
              <input id="subscribe-email"
                     name="email"
                     type="email"
                     class="subscribe-form__input"
                     placeholder="email@address.com"
                     required
                     autocomplete="email"
                     autocapitalize="none"
              >
            </div>
            <button type="submit" class="button subscribe-form__submit">Give me the code!</button>
          </form>`,
    },
    scroll: {
      title: 'Leaving so soon?',
      html: `<div class="dialog__text">
            <p>You scrolled all this way, and you’re going to leave without a <b>discount</b>? Don’t be that person.</p>
          </div>
          <form class="dialog__form subscribe-form" id="dialog-form">
            <h3 class="visually-hidden">Contact us</h3>
            <div class="subscribe-form__field">
              <label for="subscribe-email" class="subscribe-form__label visually-hidden">Email</label>
              <input id="subscribe-email"
                     name="email"
                     type="email"
                     class="subscribe-form__input"
                     placeholder="email@address.com"
                     required
                     autocomplete="email"
                     autocapitalize="none"
              >
            </div>
            <button type="submit" class="button subscribe-form__submit">Send me the goods</button>
          </form>`,
    },
  }

  function openDialog(type) {
    if (state.isFormSubmitted && (type === 'timer' || type === 'scroll')) return;
    if ((type === 'timer' || type === 'scroll') && state.isAutoShown) return;
    if (dialog.open) return;

    const template = templates[type];
    if (!template) return;

    dialogTitle.textContent = template.title;
    dialogBody.innerHTML = template.html;
    dialog.showModal();
    blockScroll();

    if (type === 'timer' || type === 'scroll') {
      state.isAutoShown = true;
      if (state.timerId) clearTimeout(state.timerId);
    }

    const form =document.getElementById('dialog-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit)
    }
  }

  function blockScroll() {
    document.documentElement.classList.toggle('is-locked')
  }

  function returnScroll() {
    document.documentElement.classList.remove('is-locked')
  }

  function closeDialog() {
    dialog.close();
    dialogBody.innerHTML = '';
    returnScroll();
  }

  function closeOnOverlayClick({currentTarget, target}) {
    const dialog = currentTarget
    const isOverlayClick = dialog === target
    if (isOverlayClick) {
      dialog.close()
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const nameValue = formData.get('name');
    if (nameValue !==null && nameValue.length < 2) {
      alert('Name should be at least 2 characters long');
      return;
    }

    closeDialog();
    openDialog('success');
    state.isFormSubmitted = true;
  }

  if (openButton) {
    openButton.addEventListener('click', (e) => {
      openDialog('clickContactUs')
    });
  }

  state.timerId = setTimeout(() => {
    openDialog('timer');
  }, 40000)


  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      openDialog('scroll');
      observer.disconnect();
    }
  }, { threshold: 0.1 });
  if (footerTrigger) observer.observe(footerTrigger);

  if (closeButton) closeButton.addEventListener('click', closeDialog);

  if (dialog) {
    dialog.addEventListener('click', closeOnOverlayClick)
    dialog.addEventListener('cancel', returnScroll)
  }
}