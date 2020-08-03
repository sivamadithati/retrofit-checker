<script>
  import { onMount } from 'svelte';
  import { Utils } from '../utils/utils.js';
  import { Routes } from '../utils/routes.js';
  import Home from './Home.svelte';
  import Status from './Status.svelte';
  // const app = require("electron").remote.app;

  /**
   * ALl the data and the interactions flow through this file. Any custom event raised in any of the Nested Component will have to be handled here.
   * This is to follow a partial Flux methodology to avoid confusions when we are working with the deep Nested components.
  */


  let route, appObj;

  /**
   * Method to 
   *  - Initialize the local variables
   *  - Check the local storage for personal access token and the organization name
   *    - If present, set the route to Status check page
   *    - Else, set the route to Home page
  */
  function init() {
    appObj = Utils.getAppObj();
    route = appObj && appObj.token && appObj.orgName ? Routes.STATUS_CHECK : Routes.HOME;
  }

  /**
   * Method to save the follwing Github Details:
   *  - Personal Access Token
   *  - Organization Name
   * All the details are saved in the local storage and not exposed to internet except for Github Official API
  */
  function saveGithubDetails(event) {
    let data = getDetailObj(event);
    let obj = {
      token: data.token,
      orgName: data.orgName
    };
    Utils.setAppObj(obj);
    init();
  }

  /**
   * Method that toggles the modal
  */
  function toggleDeleteModal() {
    window.$('#delete-modal').modal('toggle');
  }

  /**
   * Method to delete the whole App Obj
   *  - Deletes the object from local storage
   *  - Initializes the application
   *  - Closes the Delete modal
  */
  function continueDelete() {
    Utils.deleteAppObj();
    init();
    toggleDeleteModal();
  }

  /**
   * Method to cancel the delete operation
   *  - Closes the Delete modal
  */
  function cancelDelete() {
    toggleDeleteModal();
  }

  /**
   * Method to save the artifact details to the localstorage
   * Following are the attributes that are saved:
   *    - Artifact Name (artName)
   *    - Base Branch (baseName)
   *    - Artifact Common Prefix (artPrefix)
   *    - Repository Name (repoName)
   * 
   * For Eg: If the following is the Github URL for your repository:
   * 
   * URL: https://github.com/FooBar/foo/tree/foo-branch-2020XXXX
   * 
   * Artifact Name 
   *    - is some text for you to identify easily
   * Base Branch 
   *    - default branch where all the code will be merged after the production deployment or release (usually master)
   * Artifact Common Prefix
   *    - From the above URL, branch name is foo-branch-2020XXXX
   *    - If 'foo-branch-' is commonly prefixed for all the branches that you create, then 'foo-branch-' is the Artifact Common Prefix
   * Repository Name
   *    - In the above URL, "foo" is the repository name
  */
  function addArtifact(event) {
    let data = getDetailObj(event);
    let artifact = {
      artName: data.artName,
      baseName: data.baseName,
      artPrefix: data.artPrefix,
      repoName: data.repoName
    }
    appObj.artifacts[artifact.artPrefix.replace(/[\/\-]/gi, "_")] = artifact;
    Utils.setAppObj(appObj);
  }

  function editArtifact(event) {
    deleteArtifact(event);
    addArtifact(event);
  }

  function deleteArtifact(event) {
    let data = getDetailObj(event);
    delete appObj.artifacts[data.existingItemPrefix.replace(/[\/\-]/gi, "_")];
    Utils.setAppObj(appObj);
  }

  /**
   * Method to get just the detail object from the Event object received from the Custom Events from Nested component
  */
  function getDetailObj(event) {
    return event.detail;
  }

  /**
   * Initializing the local variables and setting the values from the localstorage when this component mounts
  */
  onMount(() => {
    init();
  });

</script>


<main>
  <div class="container-fluid p-0">
    <!-- Jumbotron -->
    <div class="jumbotron text-center">
      <h1 class="display-4">Github Retrofit Checker</h1>
      <p class="lead">Tool to check if the retrofit has been done from the base branch</p>
      <hr class="my-4">
      <p>Start adding the artifacts that you need to monitor</p>
      {#if appObj && appObj.token && appObj.orgName}
          <button type="button" class="btn btn-danger" on:click={toggleDeleteModal}>Delete Configuration</button>
      {/if}
    </div>
    <div class="row justify-content-center ">
      <!-- Form to enter the Github details: Organization Name and the Personal Access Token -->
      {#if route == Routes.HOME}
        <Home 
          on:saveGithubDetails={saveGithubDetails}
        />
      {/if}
      <!-- Check Status section -->
      {#if route == Routes.STATUS_CHECK}
          <Status 
            artifacts={Object.values(appObj.artifacts)} 
            token={appObj.token} 
            orgName={appObj.orgName} 
            on:editArtifact={editArtifact} 
            on:addArtifact={addArtifact}
          />
      {/if}
    </div>
  </div>

  <!-- Delete modal -->
  <div class="modal fade" id="delete-modal" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body p-4">
              <div class="row">
                <div class="col-12 my-4 text-center">
                  <p>Do you want to delete all the Configuration?</p>
                </div>
                <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-link" on:click={cancelDelete}>Cancel</button>
                    <button class="btn btn-danger" on:click={continueDelete}>Delete</button>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</main>