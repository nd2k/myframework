import styles from './form.styles.scss';
import eventBus from '../../helpers/eventBus';

// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

const template = document.createElement('template');
template.innerHTML = `
<div class="form">
  <form>
    <div class="form-inside">
      <slot />
    </div>
  </form>
</div>
`;

class Form extends HTMLElement {
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
    this.getFieldsValue = this.getFieldsValue.bind(this);

    // Get all needed properties
    this.fields = document.querySelectorAll('.field-input');
  }

  getFieldsValue() {
    let projectFormInput = {};
    this.fields.forEach((field) => {
      let inputs = field.shadowRoot.querySelectorAll('.form-control');
      inputs.forEach((input) => {
        let name = input.name;
        let value = input.value;
        let field = { name: value };
        console.log(field);

        return (projectFormInput = { ...projectFormInput, ...field });
      });
    });
    console.log(projectFormInput);
  }

  // Listen eventBus to catch the click on the burger menu
  connectedCallback() {
    eventBus.addEventListener('create-project', this.getFieldsValue);
  }

  disconnectedCallback() {}
}

window.customElements.define('custom-form', Form);

export default Form;
