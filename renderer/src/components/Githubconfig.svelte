<script>
    import Home from './Home.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    /**
     * Method that toggles the modal
    */
    function toggleDeleteModal() {
        window.$('#delete-modal').modal('toggle');
    }

    function continueDelete() {
        toggleDeleteModal();
        dispatch('continueDelete', {});
    }

    function editGithubConfig() { }

    /**
     * Method to cancel the delete operation
     *  - Closes the Delete modal
    */
    function cancelDelete() {
        toggleDeleteModal();
    }
</script>
<div class="col-10 border text-center my-3 p-5">
    <div class="row">
        <div class="col-12">
            <h3>Github Configuration</h3>
            <p>Change the Github Token or the Organization name</p>
            <button class="btn btn-info float-left" on:click={editGithubConfig}>Edit Github Config</button>
            <button class="btn btn-danger float-right" on:click={continueDelete}>Delete All Config</button>
        </div>
    </div>
</div>

<!-- Delete modal -->
<div class="modal fade" id="delete-modal" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
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

<!-- Edit Github config modal -->
<div class="modal fade" id="edit-github-modal" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body p-4">
                <Home />
            </div>
        </div>
    </div>
</div>