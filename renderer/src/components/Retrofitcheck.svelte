<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let releaseDate;

    function checkRetrofit() {
        dispatch('checkRetrofit', {
            date: releaseDate
        });
    }

    function goToRepositories() {
        dispatch('goToRepositories', {});
    }

    function init() {
        releaseDate = '';
    }

    init();
</script>

<div class="col-10 p-5 border my-4">
    <form on:submit|preventDefault="{checkRetrofit}">
        <div class="form-group">
            <label for="releaseDate">Release date</label>
            <input type="text" class="form-control" id="releaseDate" aria-describedby="releaseDateHelp"
                bind:value={releaseDate} required>
            <small id="releaseDateHelp" class="form-text text-muted">If the release branch name is
                <kbd>foo-bar-2020XXXX</kbd> then please provide <kbd>2020XXXX</kbd> as input</small>
        </div>
        <button type="submit" class="float-right btn btn-warning">
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8.5" cy="8.5" r="5" />
                    <path d="m17.571 17.5-5.571-5.5" />
                </g>
            </svg>
            Check Status
        </button>
        <button type="button" class="float-right btn btn-link" on:click={goToRepositories}>Cancel</button>
    </form>

</div>