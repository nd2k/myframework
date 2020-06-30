import styles from './navbar.styles.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library, dom } from '@fortawesome/fontawesome-svg-core';

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
      <li><slot name="icon" class="right icon"></slot></li>
    </div>
  </ul>
</nav>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = styles;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    library.add(faBars);
    dom.watch();

    let links = this.shadowRoot.querySelectorAll('[route]');

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        let activeLink = this.shadowRoot.querySelector('.active');
        activeLink.classList.remove('active');
        event.currentTarget.classList.add('active');
      });
    });
  }
}

window.customElements.define('custom-navbar', Navbar);

export default Navbar;
