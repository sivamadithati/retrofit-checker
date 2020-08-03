<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let releaseDate;

    function checkRetrofit() {
        dispatch('checkRetrofit', {
            date: releaseDate
        });
    }

    function init() {
        releaseDate = '';
    }

    init();
</script>
<div class="col-10 border p-5">
    <div class="row mb-3">
        <div class="col-12">
            <form on:submit|preventDefault="{checkRetrofit}">
                <h3 class="text-center">Status Checker</h3>
                <div class="form-group">
                    <label for="releaseDate">Release date</label>
                    <input type="text" class="form-control" id="releaseDate" aria-describedby="releaseDateHelp"
                        bind:value={releaseDate} required>
                    <small id="releaseDateHelp" class="form-text text-muted">If the release branch name is
                        foo-bar-2020XXXX then please provide 2020XXXX as input</small>
                </div>
                <button type="submit" class="float-right btn btn-warning">Check Status</button>
            </form>
        </div>
    </div>
</div>