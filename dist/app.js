const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}));

document.querySelectorAll('.swatch').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.brand-demo').style.setProperty('--demo-color', button.dataset.color);
    document.querySelectorAll('.swatch').forEach(swatch => {
      swatch.classList.toggle('active', swatch === button);
      swatch.setAttribute('aria-pressed', String(swatch === button));
    });
  });
});

const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('#contact-form');
const formView = dialog.querySelector('.form-view');
const successView = dialog.querySelector('.form-success');
let lastTrigger;
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  lastTrigger = button;
  formView.hidden = false;
  successView.hidden = true;
  dialog.setAttribute('aria-labelledby', 'contact-title');
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
function closeDialog() { dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
document.querySelector('#close-success').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  form.reset();
  lastTrigger?.focus({preventScroll:true});
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  formView.hidden = true;
  successView.hidden = false;
  successView.querySelector('h2').id = 'success-title';
  dialog.setAttribute('aria-labelledby', 'success-title');
  document.querySelector('#close-success').focus();
  dialog.scrollTop = 0;
  form.reset();
});
