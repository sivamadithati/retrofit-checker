<script>
    export let artifacts, token, orgName;

    import Artifacts from './Artifacts.svelte';
    import AddArtifact from './AddArtifact.svelte';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let releaseDate = '', displayStatus = false;

    function toggleAddArtifactModal() {
        window.$('#add-artifact').modal('toggle');
    }

    function addArtifact(event) {
        toggleAddArtifactModal();
        dispatch("addArtifact", event.detail);
    }

    function viewArtifacts() {
        window.$('#artifacts-modal').modal();
    }

    function closeModal() {
        window.$('#artifacts-modal').modal('hide');
    }

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

    function checkGitHubStatus() {

    }
</script>

{#if artifacts && artifacts.length>0}
<div class="col-10 text-center mb-3">
    <div class="row justify-content-between">
        <button class="btn btn-info" on:click={viewArtifacts}> View Artifacts</button>
        <button class="btn btn-warning" on:click={toggleAddArtifactModal}> + Add Artifact</button>
    </div>
</div>
<div class="col-10 border p-5">
    <div class="row mb-3">
        <div class="col-12">
            <form on:submit|preventDefault="{()=>{displayStatus=true}}">
                <h3 class="text-center">Status Checker</h3>
                <div class="form-group">
                    <label for="releaseDate">Release date</label>
                    <input type="text" class="form-control" id="releaseDate" aria-describedby="releaseDateHelp"
                        bind:value={releaseDate} on:keypress="{()=>{displayStatus=false}}" required>
                    <small id="releaseDateHelp" class="form-text text-muted">If the release branch name is
                        foo-bar-2020XXXX then please provide 2020XXXX as input</small>
                </div>
                <button type="submit" class="float-right btn btn-warning">Check Status</button>
            </form>
        </div>
    </div>
    <div class="row justify-content-center">
        {#if displayStatus==true}
            {#each artifacts as artifact}
                {#await getGitCompareStatus(artifact)}
                    <div class="col-10 mb-3 text-center">
                        <div class="spinner-border text-info " role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                {:then response}
                        <div class="col-10 border mb-3" 
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
                <div class="col-10 mb-3">
                    <div class="card">
                        <div class="card-body text-danger text-center">
                            Error occured {error.message}
                        </div>
                    </div>
                </div>
                {/await}
            {/each} 
        {/if}
    </div>
</div>
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


<div class="modal fade" id="add-artifact" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <AddArtifact on:addArtifact={addArtifact}/>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="artifacts-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-body">
                <Artifacts artifacts={artifacts} on:addArtifact on:closeModal={closeModal}/>
            </div>
        </div>
    </div>
</div>