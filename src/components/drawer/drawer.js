import styles from './drawer.styles.scss';
import eventBus from '../../helpers/eventBus';

const template = document.createElement('template');
template.innerHTML = `
<div id='drawer'>
  Drawer
</div>
`;

class Drawer extends HTMLElement {
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
  }

  // Listen eventBus to catch the click on the burger menu
  connectedCallback() {
    let state = false;
    let drawer = this.shadowRoot.getElementById('drawer');
    eventBus.addEventListener('toggle-drawer', (event) => {
      if (event.detail.state !== state) {
        drawer.classList.toggle('open');
      }
    });
  }
}

window.customElements.define('custom-drawer', Drawer);

export default Drawer;
