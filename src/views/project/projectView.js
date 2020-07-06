export default () => {
  return `
<div id="project">
  <custom-form>
    <h1>Create a new project</h1>
    <p>Please, fill all the required fields in the following form.</p>
    <form-field label="Enter your project's name" name="projectName" class="field-input">
    </form-field>
    <form-field label="Enter an Id" name="projectId" class="field-input">
    </form-field>
    <form-textarea label="Enter a summary of your project" name="projectDescription" class="field-input">
    </form-textarea>
    <custom-button id="#createBtn" color="#264653">Create</custom-button>
  </custom-form>
</div>
`;
};
