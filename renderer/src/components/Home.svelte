<script>
    export let existingToken, existingOrgName;

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let orgName, token;
    function init() {
        orgName = existingOrgName ? existingOrgName : '';
        token = existingToken ? existingToken : '';
    };

    onMount(() => {
        init();
    });

    function saveGithubDetails() {
        dispatch('saveGithubDetails', {
            orgName, token
        });
    }
</script>
<div class="col-10 p-5" 
    class:border="{!existingOrgName && !existingOrgName}"
    class:col-12="{existingOrgName && existingOrgName}"
>
    <form on:submit|preventDefault={saveGithubDetails}>
        <h3 class="text-center">Github Details</h3>
        <div class="alert-info p-3 text-monospace mb-2">
            <p>Github URL: <span class="text-danger">https://github.com/FooBar/foo/tree/foo-branch-2020XXXX</span></p>
            <ul>
                <li>Organization Name: <kbd>FooBar</kbd></li>
            </ul>
        </div>
        <div class="form-group">
            <label for="orgName">Organization Name</label>
            <input type="text" class="form-control" id="orgName" bind:value={orgName} required>
        </div>

        <div class="form-group">
            <label for="patToken">Personal Access Token</label>
            <input type="password" class="form-control" id="patToken" aria-describedby="patTokenHelp" bind:value={token}
                required>
            <small id="patTokenHelp" class="form-text text-muted">This token will never be shared with anyone. It
                will remain in your browser window.</small>
        </div>

        <button type="submit" class="btn btn-warning float-right">Save</button>

    </form>
</div>