import styles from './form-field.styles.scss';
// import eventBus from '../../helpers/eventBus';

// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

const template = document.createElement('template');
template.innerHTML = `
<div class="form-field">
  <div class="input-group">
    <input type="text" class="form-control" />
    <label></label>
    <span class="error">This field is required!</span>
  </div>
</div>
`;

class FormField extends HTMLElement {
  constructor() {
    // Mandatory to invoke super()
    super();
    // Allow to access this element from outside this shadow DOM
    this.attachShadow({ mode: 'open' });

    // Inject styles
    const style = document.createElement('style');
    style.textContent = styles;
    this.shadowRoot.appendChild(style);
    // Create element in the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Add font-awesome icon
    // library.add(faUser);
    // dom.watch();

    // Bind this to all our methods

    // Get all needed properties
    this.formControl = this.shadowRoot.querySelector('.form-control');
    this.shadowRoot.querySelector('label').innerHTML = this.getAttribute(
      'label'
    );
    this.name = this.getAttribute('name');
    this.formControl.setAttribute('name', this.name);
  }

  connectedCallback() {
    this.formControl.addEventListener('focusout', () => {
      if (this.formControl.value.length > 0) {
        this.formControl.classList.add('has-value');
      } else {
        this.formControl.classList.remove('has-value');
      }
    });
  }

  disconnectedCallback() {
    this.formControl.removeEventListener('focusout', { passive: true });
  }
}

window.customElements.define('form-field', FormField);

export default FormField;
