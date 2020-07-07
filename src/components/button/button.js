import styles from './button.styles.scss';
import variables from '../../styles/partials/_variables.scss';
import eventBus from '../../helpers/eventBus';

// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

const template = document.createElement('template');
template.innerHTML = `
<div class="custom-button">
  <slot />
</div>


`;

class Button extends HTMLElement {
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
    this.getFormInputs = this.getFormInputs.bind(this);

    // Get all needed properties
    this.color = this.getAttribute('color');
    this.position = this.getAttribute('position');
    this.button = this.shadowRoot.querySelector('.custom-button');
    this.button.style.backgroundColor = this.color;
    if(this.position === 'center') {
      this.button.classList.add('center')
    } else if(this.position === 'right') {
      this.button.classList.add('right')
    } else if(this.position === 'left') {
      this.button.classList.add('left')
    }
  }

  getFormInputs() {
    eventBus.dispatchEvent('create-project', {});
  }

  connectedCallback() {
    this.button.addEventListener('click', this.getFormInputs);
  }

  disconnectedCallback() {
    this.button.removeEventListener();
  }
}

window.customElements.define('custom-button', Button);

export default Button;
