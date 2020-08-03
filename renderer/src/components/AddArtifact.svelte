<script>
    export let artifact, existingItemPrefix;

    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    let artName, artPrefix, baseName, repoName;

    function init() {
        artName = artifact ? artifact.artName : '';
        artPrefix = artifact ? artifact.artPrefix : '';
        baseName = artifact ? artifact.baseName : '';
        repoName = artifact ? artifact.repoName : '';
    }

    function saveArtifact() {
        let artObj = {
            artName,
            artPrefix,
            baseName,
            repoName,
            existingItemPrefix
        };
        dispatch(artifact ? 'editArtifact' : 'addArtifact', artObj);
        resetProps();
        init();
    }

    function cancel() {
        dispatch('cancel', {});
    }

    function resetProps() {
        artifact = '';
        existingItemPrefix = '';
    }

    onMount(() => {
        init();
    });
</script>


<form on:submit|preventDefault={saveArtifact}>
    <h3 class="text-center">Artifact Details</h3>
    <div class="form-group">
        <label for="artifactName">Artifact Name</label>
        <input type="text" class="form-control" id="artifactName" bind:value={artName} required>
    </div>
    <div class="form-group">
        <label for="repoName">Repository Name</label>
        <input type="text" class="form-control" id="repoName" bind:value={repoName} required>
    </div>
    <div class="form-group">
        <label for="baseBranch">Base branch</label>
        <input type="text" class="form-control" id="baseBranch" aria-describedby="baseBranchHelp" bind:value={baseName}
            required>
        <small class="baseBranchHelp">Branch from which retrofit needs to be performed. Defaults to
            master.</small>
    </div>
    <div class="form-group">
        <label for="artifactPrefix">Artifact Base Prefix</label>
        <input type="text" class="form-control" id="artifactPrefix" aria-describedby="artifactPrefixHelp"
            bind:value={artPrefix} required>
        <small id="artifactPrefixHelp" class="form-text text-muted">If the relese branch name is
            foo-bar-2020XXXX then base prefix would be foo-bar-.</small>
    </div>
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-link" on:click={cancel}>Cancel</button>
        <button type="submit" class="btn btn-warning">Save</button>
    </div>

</form>