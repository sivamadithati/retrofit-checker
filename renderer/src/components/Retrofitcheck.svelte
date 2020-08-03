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
<div class="col-10 p-0 mb-2">
    <div class="row">
        <div class="col-12">
            <form on:submit|preventDefault="{checkRetrofit}">
                <div class="card">
                    <div class="text-center mb-1">
                        <h3 class="display-4 bg-light text-dark p-1">Status Checker</h3>
                        <p>Details to be filled</p>
                    </div>
                    <hr class="my-2" />
                    <div class="card-body">
                        <div class="form-group">
                            <label for="releaseDate">Release date</label>
                            <input type="text" class="form-control" id="releaseDate" aria-describedby="releaseDateHelp"
                                bind:value={releaseDate} required>
                            <small id="releaseDateHelp" class="form-text text-muted">If the release branch name is
                                foo-bar-2020XXXX then please provide 2020XXXX as input</small>
                        </div>
                        <button type="submit" class="float-right btn btn-warning">Check Status</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>