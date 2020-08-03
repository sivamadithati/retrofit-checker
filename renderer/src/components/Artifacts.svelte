<script>
    export let artifacts;

    import { createEventDispatcher } from 'svelte';

    import AddArtifact from './AddArtifact.svelte';

    const dispatch = createEventDispatcher();

    let searchTerm, displayAddArtifactForm, selectedArtifact, existingItemPrefix;

    $: filteredArtifacts = artifacts && artifacts.length > 0 && artifacts.filter(item => item.artName.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

    function addArtifact(event) {
        init();
        hideAddArtifactModal();
        dispatch('addArtifact', event.detail);
    }

    function updateArtifact(event) {
        init();
        dispatch('editArtifact', event.detail);
    }

    function deleteArtifact(artifact) {
        init();
        dispatch('deleteArtifact', {
            existingItemPrefix: artifact.artPrefix
        });
    }

    function cancelAddOrEdit() {
        init();
    }

    function editArtifact(artifact) {
        selectedArtifact = artifact;
        existingItemPrefix = artifact.artPrefix;
        showAddArtifactForm();
    }

    function toggleArtifactsModal() {
        window.$('#artifacts-modal').modal('toggle');
    }

    function viewArtifactsModal() {
        toggleArtifactsModal();
    }

    function closeArtifactsModal() {
        init();
        toggleArtifactsModal();
    }


    function showAddArtifactModal() {
        window.$('#add-artifact').modal();
    }

    function hideAddArtifactModal() {
        window.$('#add-artifact').modal('hide');
    }

    function showAddArtifactForm() {
        displayAddArtifactForm = true;
    }

    function init() {
        displayAddArtifactForm = false;
        selectedArtifact = '';
        existingItemPrefix = '';
        searchTerm = '';
    }

    // Initialize all the variables
    init();
</script>

<!-- Main Artifact section -->
<div class="col-10 border text-center mb-3 p-5">
    <div class="row">
        <div class="col-12 mb-2">
            <h3 class="text-center">Artifacts</h3>
            <button class="btn btn-info float-left" on:click={viewArtifactsModal}> View Artifacts</button>
            <button class="btn btn-warning float-right" on:click={showAddArtifactModal}> + Add Artifact</button>
        </div>
    </div>
</div>

<!-- Artifacts Modal -->
<div class="modal fade" id="artifacts-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-body">
                {#if displayAddArtifactForm == true}
             <div class="col-12 p-5">
                <AddArtifact 
                   artifact={selectedArtifact} 
                   existingItemPrefix={existingItemPrefix} 
                   on:editArtifact={updateArtifact} 
                   on:addArtifact={addArtifact}
                   on:cancel={cancelAddOrEdit}
                   />
             </div>
             {:else}
             <div class="col-12 p-5">
                {#if artifacts && artifacts.length>0}
                <div class="row mb-4">
                   <div class="col-5">
                      <input id="search-box" class="form-control border border-warning" type="text" placeholder="Search..." bind:value={searchTerm}>
                   </div>
                   <div class="col-7">
                      <button class="btn btn-warning float-right" on:click={showAddArtifactForm}> + Add Artifact</button>
                   </div>
                </div>
                {#if  filteredArtifacts.length>0}
                <div class="row" style="height: 400px; overflow-y: scroll;">
                   <div class="col-12">
                      <table class="table table-striped">
                         <thead>
                            <tr>
                               <th scope="col">#</th>
                               <th scope="col">Artifact Name</th>
                               <th scope="col">Branch Prefix</th>
                               <th scope="col">Base Branch</th>
                               <th scope="col"></th>
                               <th scope="col"></th>
                            </tr>
                         </thead>
                         <tbody>
                            {#each filteredArtifacts as artifact, i}  
                            <tr>
                               <th scope="row">{i+1}</th>
                               <td>{artifact.artName}</td>
                               <td>{artifact.artPrefix}</td>
                               <td>{artifact.baseName}</td>
                               <td>
                                  <button type="button" class="btn btn-light" on:click="{()=>{editArtifact(artifact)}}">Edit</button>
                               </td>
                               <td>
                                  <button type="button" class="btn btn-danger" on:click="{()=>{deleteArtifact(artifact)}}">Delete</button>
                               </td>
                            </tr>
                            {/each}
                         </tbody>
                      </table>
                   </div>
                </div>
                {:else}
                <div class="row">
                   <div class="col-12 text-center">
                      <div class="row justify-content-center">
                         <h4 class="col-12 text-info display-5 mb-4">Oops! Artifacts with the name {searchTerm} doesn't exist.</h4>
                      </div>
                   </div>
                </div>
                {/if}
                {:else}
                <div class="row">
                   <div class="col-12 text-center">
                      <div class="row justify-content-center">
                         <h4 class="col-12 text-info display-5 mb-4">Oops! Looks like you haven't added any artifacts yet.</h4>
                         <div class="col-7">
                            <button class="btn btn-warning" on:click={showAddArtifactForm}> + Add Artifact</button>
                         </div>
                      </div>
                   </div>
                </div>
                {/if}
             </div>
             <div class="col-12 p-5">
                <button class="btn btn-info float-right" on:click={closeArtifactsModal}>Close</button>
             </div>
             {/if}
          </div>
       </div>
    </div>
 </div>

 <!-- Add Artifact Modal -->
 <div class="modal fade" id="add-artifact" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             <AddArtifact 
                on:addArtifact={addArtifact}
                on:cancel={hideAddArtifactModal}
                />
          </div>
       </div>
    </div>
 </div>