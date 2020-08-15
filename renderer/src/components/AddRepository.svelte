<script>
    export let repository;

    import { createEventDispatcher, onMount, beforeUpdate } from 'svelte';

    const dispatch = createEventDispatcher();

    let repoDesc, repoPrefix, baseName, repoName;

    function init() {
        repoDesc = repository ? repository.repoDesc : '';
        repoPrefix = repository ? repository.repoPrefix : '';
        baseName = repository ? repository.baseName : '';
        repoName = repository ? repository.repoName : '';
    }

    function saveRepository() {
        let repoObj = {
            repoDesc,
            repoPrefix,
            baseName,
            repoName,
            existingItemPrefix: repository ? repository.repoPrefix : ''
        };
        dispatch(repository ? 'editRepository' : 'addRepository', repoObj);
        resetProps();
        init();
    }

    function cancel() {
        dispatch('cancel', {});
    }

    function resetProps() {
        repository = '';
    }

    init();
</script>


<form on:submit|preventDefault={saveRepository}>
    <h3 class="text-center">Repository Details</h3>
    <div class="alert-info p-3 text-monospace mb-2">
        <p>Github URL: <span class="text-danger">https://github.com/FooBar/foo/tree/foo-branch-2020XXXX</span></p>
        <ul>
            <li>Repository Name: <kbd>foo</kbd></li>
            <li>Repository Branch: <kbd>foo-branch-2020XXXX</kbd></li>
            <li>Repository Branch Prefix: <kbd>foo-branch-</kbd></li>
        </ul>
    </div>
    <div class="form-group">
        <label for="repositoryName">Repository Description</label>
        <input type="text" class="form-control" id="repositoryName" bind:value={repoDesc} required>
    </div>
    <div class="form-group">
        <label for="repoName">Repository Name</label>
        <input type="text" class="form-control" id="repoName" bind:value={repoName} required>
    </div>
    <div class="form-group">
        <label for="baseBranch">Base branch</label>
        <input type="text" class="form-control" id="baseBranch" aria-describedby="baseBranchHelp" bind:value={baseName}
            required>
        <small id="baseBranchHelp" class="form-text text-muted">Branch from which retrofit needs to be performed. Eg: 
            <kbd>master</kbd>
        </small>
    </div>
    <div class="form-group">
        <label for="repositoryPrefix">Repository Branch Prefix</label>
        <input type="text" class="form-control" id="repositoryPrefix"
            bind:value={repoPrefix} required>
    </div>
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-link" on:click={cancel}>Cancel</button>
        <button type="submit" class="btn btn-warning">Save</button>
    </div>

</form>