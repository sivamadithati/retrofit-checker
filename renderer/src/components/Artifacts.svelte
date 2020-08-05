<script>
    export let artifacts;

    import { createEventDispatcher } from 'svelte';

    import AddArtifact from './AddArtifact.svelte';

    const dispatch = createEventDispatcher();

    let searchTerm, selectedArtifact, recreateAddComponent;

    $: filteredArtifacts = artifacts && artifacts.length > 0 && artifacts.filter(item => item.artName.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

    function addArtifact(event) {
        init();
        hideAddArtifactModal();
        dispatch('addArtifact', event.detail);
    }

    function updateArtifact(event) {
        init();
        hideAddArtifactModal();
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
        showAddArtifactModal();
    }

    function showAddArtifactModal() {
        recreateAddComponent = true;
        window.$('#add-artifact').modal();
    }

    function hideAddArtifactModal() {
        window.$('#add-artifact').modal('hide');
    }

    function goToStatusPage() {
        dispatch('goToStatusPage', {});
    }

    function init() {
        selectedArtifact = '';
        searchTerm = '';
        recreateAddComponent = false;
    }

    // Initialize all the variables
    init();
</script>
<!-- Main Artifact section -->
<div class="col-10 text-center mb-2 p-0">
    <div class="row">
        <div class="col-12 mb-2">
            <div class="card">
                <div class="text-center mb-1">
                    <h3 class="display-4 bg-light text-dark p-1">Artifacts</h3>
                    <p>Change the Github Token or the Organization name</p>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Artifacts Modal -->
<div class="col-10 p-5">
    {#if artifacts && artifacts.length>0}
    <div class="row mb-4">
       <div class="d-flex col-12 justify-content-between">
          <button class="btn btn-warning" on:click={showAddArtifactModal}>
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 4)">
                    <path d="m10.5.5h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2z" transform="matrix(0 1 -1 0 13 0)"/>
                    <path d="m6.5 3.5v6.056"/><path d="m6.5 3.5v6" transform="matrix(0 1 -1 0 13 0)"/>
                </g>
            </svg>  
            Add Artifact
          </button>
          <button class="btn btn-info" on:click={goToStatusPage}>
            <svg height="21" class="text-white" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
                   <circle cx="8.5" cy="8.5" r="5"/>
                   <path d="m17.571 17.5-5.571-5.5"/>
                </g>
             </svg>
              Check Status
            </button>
       </div>
    </div>
    <div class="row mb-4">
        <div class="col-12">
            <input id="search-box" class="form-control border border-warning" type="text" placeholder="Search..." bind:value={searchTerm}>
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
                      <button type="button" class="btn btn-light" on:click="{()=>{editArtifact(artifact)}}">
                        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)">
                               <path d="m7 2.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682"/>
                               <path d="m9.49086518-.60570641c.79784342.01307433 1.43777452.66357797 1.43777452 1.46152846v9.87574095l-1.41421359 2.8284271-1.41421356-2.8284271-.04115759-9.92287518c-.00322702-.77801908.62486604-1.41134419 1.40288513-1.41457122.00964205-.00003999.01928425.00001901.02892509.00017699z" transform="matrix(.70710678 .70710678 -.70710678 .70710678 7.360659 -4.816202)"/>
                               <path d="m12.5 3.5.953 1"/>
                            </g>
                         </svg>
                      </button>
                   </td>
                   <td>
                      <button type="button" class="btn btn-danger" on:click="{()=>{deleteArtifact(artifact)}}">
                        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)">
                               <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.1045695 0 2 .8954305 2 2h-4c0-1.1045695.8954305-2 2-2z"/>
                               <path d="m.5 2.5h14"/>
                               <path d="m5.5 5.5v8"/>
                               <path d="m9.5 5.5v8"/>
                            </g>
                         </svg>
                      </button>
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
                <button class="btn btn-warning" on:click={showAddArtifactModal}> + Add Artifact</button>
             </div>
          </div>
       </div>
    </div>
    {/if}
 </div>
 <!-- Add Artifact Modal -->
 <div class="modal fade" id="add-artifact" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             {#if recreateAddComponent == true} 
             <AddArtifact 
                on:addArtifact={addArtifact}
                on:cancel={hideAddArtifactModal}
                on:editArtifact={updateArtifact}
                artifact={selectedArtifact}
                />
            {/if}
          </div>
       </div>
    </div>
 </div>