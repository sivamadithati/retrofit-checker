<script>
  import { onMount } from 'svelte';
  import { Utils } from '../utils/utils.js';
  import { Routes } from '../utils/routes.js';
  import Navbar from './Navbar.svelte';
  import Jumbotron from './Jumbotron.svelte';
  import Home from './Home.svelte';
  import Status from './Status.svelte';
  import Artifacts from './Artifacts.svelte';
  import Githubconfig from './Githubconfig.svelte';
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
   *    - If present, set the route to Artifacts page
   *    - Else, set the route to Home page
  */
  function init() {
    appObj = Utils.getAppObj();
    route = appObj && appObj.token && appObj.orgName ? Routes.ARTIFACTS : Routes.HOME;
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
      ...appObj,
      token: data.token,
      orgName: data.orgName,
    };
    Utils.setAppObj(obj);
    init();
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
  }

  function goToStatusPage() {
    route = Routes.STATUS_CHECK;
  }

  function goToArtifacts() {
    route = Routes.ARTIFACTS;
  }

  function goToGithubConfig() {
    route = Routes.GITHUB_CONFIG;
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
    // adding this, as svelte will only trigger re-ender if there's an assignment (wouldn't work for delete operation)
    // https://github.com/sveltejs/svelte/issues/3211
    appObj.artifacts = appObj.artifacts;
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
  <Navbar on:goToArtifacts={goToArtifacts} on:goToStatusPage={goToStatusPage} on:goToHome={init}
    on:goToGithubConfig={goToGithubConfig} />

  <div class="container-fluid p-0">
    {#if appObj}
      <Jumbotron token={appObj.token} orgName={appObj.orgName} />
    {/if}
    <div class="row justify-content-center ">
      <!-- Form to enter the Github details: Organization Name and the Personal Access Token -->
      {#if route == Routes.HOME}
        <Home 
          on:saveGithubDetails={saveGithubDetails}
        />
      {/if}

      {#if route == Routes.ARTIFACTS}
          <Artifacts 
            artifacts={Object.values(appObj.artifacts)} 
            on:addArtifact={addArtifact} 
            on:editArtifact={editArtifact} 
            on:deleteArtifact={deleteArtifact} 
            on:goToStatusPage={goToStatusPage}
          />
      {/if}

      <!-- Check Status section -->
      {#if route == Routes.STATUS_CHECK}
          <Status 
            artifacts={Object.values(appObj.artifacts)} 
            token={appObj.token} 
            orgName={appObj.orgName} 
            on:goToArtifacts={goToArtifacts}
            on:saveGithubDetails={saveGithubDetails}
            on:addArtifact={addArtifact} 
          />
      {/if}

      {#if route == Routes.GITHUB_CONFIG}
          <Githubconfig 
            on:continueDelete={continueDelete} 
            token={appObj.token} 
            orgName={appObj.orgName} 
            on:saveGithubDetails={saveGithubDetails}/>
      {/if}
    </div>
  </div>
</main>