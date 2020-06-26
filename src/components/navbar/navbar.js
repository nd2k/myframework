import styles from './navbar.styles.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library, dom } from '@fortawesome/fontawesome-svg-core';

const template = document.createElement('template');
template.innerHTML = `
<nav>
  <ul class="menu">
    <div className="left">
      <li><a href="#">Home</a></li>
      <li><a href="#">Dashboard</a></li>
    </div>
    <div className="right">
      <li><a href="#" class="right">Sign In</a></>
      <li><a href="#" class="right">Sign Up</a></li>
      <li><slot name="icon" class="right icon"></slot></li>
    </div>
  </ul>
</nav>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();

    library.add(faBars);
    dom.watch();

    const style = document.createElement('style');
    style.textContent = styles;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('custom-navbar', Navbar);
