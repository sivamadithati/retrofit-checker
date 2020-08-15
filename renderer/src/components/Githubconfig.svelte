<script>
    export let token, orgName;
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

    function editGithubConfig() {
        window.$('#edit-github-modal').modal();
    }

    function saveGithubDetails(event) {
        window.$('#edit-github-modal').modal('hide');
        dispatch('saveGithubDetails', event.detail);
    }
    /**
     * Method to cancel the delete operation
     *  - Closes the Delete modal
    */
    function cancelDelete() {
        toggleDeleteModal();
    }
</script>
<!-- Main section -->
<div class="col-10 text-center mb-4 p-0">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="text-center mb-1">
                    <h3 class="display-4 bg-light text-dark p-1">Github Configuration</h3>
                    <p>Change the Github Token or the Organization name</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-8 text-center p-0 my-4">
    <div class="row">
        <div class="col-12">
            <div class="card text-center ">
                <div class="mb-1">
                    <h3 class="display-5 bg-light text-dark p-1">Edit Configuration</h3>
                    <p>To edit the Github Personal Access Token and Organization Name</p>
                </div>
                <hr class="my-2" />
                <div class="card-body">
                    <button class="btn btn-info" on:click={editGithubConfig}>Edit Github Config</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-8 text-center p-0 my-4">
    <div class="row">
        <div class="col-12">
            <div class="card text-center">
                <div class="mb-1">
                    <h3 class="display-5 bg-light text-dark p-1">Delete Configuration</h3>
                    <p>To delete the entire Github configuration, including Token, Organization Name and Repositories</p>
                </div>
                <hr class="my-2" />
                <div class="card-body">
                    <button class="btn btn-danger" on:click={toggleDeleteModal}>Delete All Config</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Delete modal -->
<div class="modal fade" id="delete-modal" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
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
            <div class="modal-body p-4 d-flex justify-content-center">
                <Home existingToken={token} existingOrgName={orgName} on:saveGithubDetails={saveGithubDetails} />
            </div>
        </div>
    </div>
</div>