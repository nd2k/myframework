import styles from './drawer.styles.scss';
import eventBus from '../../helpers/eventBus';
import activeLink from '../../helpers/activelink';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen, faCog } from '@fortawesome/free-solid-svg-icons';

const template = document.createElement('template');
template.innerHTML = `
<div id="drawer" class="drawer">
  <a><slot name="folder-open" class="icon"></slot><span class="title" route="/projects">Projects</span></a>
  <a><slot name="cog" class="icon"></slot><span class="title">Settings</span></a>
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

    // Add font-awesome icon
    library.add(faFolderOpen, faCog);
    dom.watch();

    // Bind this to all our methods
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);

    // Get all needed properties
    this.drawer = this.shadowRoot.getElementById('drawer');
    this.layout = document.getElementById('layout');
    this.stateDrawer = false;
    this.links = this.shadowRoot.querySelectorAll('[route]');
  }

  // ToggleDrawer on by clicking or hovering
  toggleDrawer = () => {
    if (event) {
      this.stateDrawer = !this.stateDrawer;
      if (this.stateDrawer) {
        this.drawer.style.display = 'block';
        this.layout.style.marginRight = '2.5rem';
      } else {
        this.drawer.style.display = 'none';
        this.layout.style.marginRight = '0rem';
      }
    }
  };
  openDrawer = () => {
    this.drawer.style.width = '12rem';
    this.layout.style.marginRight = '12rem';
  };
  closeDrawer = () => {
    this.drawer.style.width = '2.5rem';
    this.layout.style.marginRight = '2.5rem';
  };

  // Listen eventBus to catch the click on the burger menu
  connectedCallback() {
    eventBus.addEventListener('toggle-drawer', this.toggleDrawer);
    this.drawer.addEventListener('mouseover', this.openDrawer);
    this.drawer.addEventListener('mouseout', this.closeDrawer);
    this.links.forEach((targetLink) => {
      targetLink.addEventListener('click', () => {
        let currentActiveLink = this.shadowRoot.querySelector('.active');
        activeLink(currentActiveLink, targetLink);
      });
    });
  }

  disconnectedCallback() {
    eventBus.removeEventListener();
    this.drawer.removeEventListener();
  }
}

window.customElements.define('custom-drawer', Drawer);

export default Drawer;
