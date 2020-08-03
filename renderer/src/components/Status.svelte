<script>
    export let artifacts, token, orgName;

    import Artifacts from './Artifacts.svelte';
    import AddArtifact from './AddArtifact.svelte';
    import Githubconfig from './Githubconfig.svelte';
    import Retrofitcheck from './Retrofitcheck.svelte';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let releaseDate, displayStatus;

    let headers = {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${token}`
    }
    async function getGitCompareStatus(artifact) {
        let response = await fetch(`https://api.github.com/repos/${orgName}/${artifact.repoName}/compare/${artifact.artPrefix}${releaseDate}...${artifact.baseName}`, {
            method: 'GET',
            headers: headers
        });

        return response.json();
    }

    function checkRetrofit(event) {
        displayStatus = true;
        releaseDate = event.detail.date;
    }

    function init() {
        displayStatus = false;
        releaseDate = '';
    }

    function toggleAddArtifactModal() {
        window.$('#add-artifact').modal('toggle');
    }

    function addArtifact(event) {
        init();
        toggleAddArtifactModal();
        dispatch('addArtifact', event.detail);
    }

    init();
</script>

{#if artifacts && artifacts.length>0}
{#if displayStatus==false}
<Artifacts artifacts={artifacts} on:addArtifact on:editArtifact on:deleteArtifact/>
<Retrofitcheck on:checkRetrofit={checkRetrofit}/>
<Githubconfig on:continueDelete token={token} orgName={orgName} on:saveGithubDetails/>
{:else}
<div class="col-10">
    <button type="submit" class="float-right btn btn-warning" on:click={init} >Check Another Release</button>
</div>
<div class="col-10">
    <div class="row justify-content-center p-3">
            {#each artifacts as artifact}
                {#await getGitCompareStatus(artifact)}
                    <div class="col-12 mb-3 text-center">
                        <div class="spinner-border text-info " role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                {:then response}
                        <div class="col-12 border mb-3" 
                            class:border-success="{response.ahead_by == 0}" 
                            class:border-warning="{response.message == 'Not Found'}" 
                            class:border-danger="{response.ahead_by && response.ahead_by != 0}" 
                        >
                            <div class="card-body">
                                <h3 class="card-title">{artifact.artName} ({artifact.repoName})</h3>
                                {#if response.ahead_by == 0}
                                    <p class="text-success">{artifact.artPrefix}{releaseDate} has been retrofited from {artifact.baseName}</p>
                                {:else if response.message == "Not Found"}
                                    <p class="text-warning">{artifact.artPrefix}{releaseDate} branch doesn't exist</p>
                                {:else}
                                    <p class="text-danger">{artifact.artPrefix}{releaseDate} has NOT been retrofited from {artifact.baseName}</p>
                                {/if}
                            </div>
                        </div>
                {:catch error}
                <div class="col-12 mb-3">
                    <div class="card">
                        <div class="card-body text-danger text-center">
                            Error occured {error.message}
                        </div>
                    </div>
                </div>
                {/await}
            {/each} 
    </div>
</div>
{/if}
{:else}
<div class="col-10 text-center">
    <div class="row justify-content-center">
      <h4 class="col-12 text-info display-5 mb-4">Oops! Looks like you haven't added any artifacts yet.</h4>
      <div class="col-7">
        <button class="btn btn-warning" on:click={toggleAddArtifactModal}> + Add Artifact</button>
      </div>
    </div>
  </div>
{/if}


 <!-- Add Artifact Modal -->
 <div class="modal fade" id="add-artifact" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             <AddArtifact 
                on:addArtifact={addArtifact}
                on:cancel={toggleAddArtifactModal}
                />
          </div>
       </div>
    </div>
 </div>