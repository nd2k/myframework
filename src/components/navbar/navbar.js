import styles from './navbar.styles.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import eventBus from '../../helpers/eventBus';
import activeLink from '../../helpers/activelink';

const template = document.createElement('template');
template.innerHTML = `
<nav>
  <ul class="menu">
    <div class="left">
      <li><a class="nav-link active" route="/">Home</a></li>
      <li><a class="nav-link" route="/dashboard">Dashboard</a></li>
    </div>
    <div class="right">
      <li><a class="nav-link" route="/signin">Sign In</a></>
      <li><a class="nav-link" route="/signup">Sign Up</a></li>
      <li><slot name="icon" class="icon"></slot></li>
    </div>
  </ul>
</nav>
`;

class Navbar extends HTMLElement {
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
    library.add(faBars);
    dom.watch();

    // Bind this to all our methods
    this.toggleDrawer = this.toggleDrawer.bind(this);

    // Get all needed properties
    this.links = this.shadowRoot.querySelectorAll('[route]');
    this.icon = this.shadowRoot.querySelector('.icon');
  }

  // Methods
  toggleDrawer() {
    eventBus.dispatchEvent('toggle-drawer', {});
  }

  // Handle click on hamburger menu
  connectedCallback() {
    this.icon.addEventListener('click', this.toggleDrawer);
    this.links.forEach((targetLink) => {
      targetLink.addEventListener('click', () => {
        let currentActiveLink = this.shadowRoot.querySelector('.active');
        activeLink(currentActiveLink, targetLink);
      });
    });
  }

  disconnectedCallback() {
    this.icon.removeEventListener();
  }
}

window.customElements.define('custom-navbar', Navbar);

export default Navbar;
