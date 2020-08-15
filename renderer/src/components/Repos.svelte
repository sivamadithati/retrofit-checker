<script>
   export let repositories;

   import { createEventDispatcher } from 'svelte';

   import AddRepository from './AddRepository.svelte';

   const dispatch = createEventDispatcher();

   let searchTerm, selectedRepository, recreateAddComponent;

   $: filteredRepositories = repositories && repositories.length > 0 && repositories.filter(item => item.repoDesc.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

   function addRepository(event) {
      init();
      hideAddRepositoryModal();
      dispatch('addRepository', event.detail);
   }

   function updateRepository(event) {
      init();
      hideAddRepositoryModal();
      dispatch('editRepository', event.detail);
   }

   function deleteRepository(repository) {
      init();
      dispatch('deleteRepository', {
         existingItemPrefix: repository.repoPrefix
      });
   }

   function editRepository(repository) {
      selectedRepository = repository;
      showAddRepositoryModal();
   }

   function showAddRepositoryModal() {
      recreateAddComponent = true;
      window.$('#add-repository').modal();
   }

   function hideAddRepositoryModal() {
      init();
      window.$('#add-repository').modal('hide');
   }

   function goToStatusPage() {
      dispatch('goToStatusPage', {});
   }

   function init() {
      selectedRepository = '';
      searchTerm = '';
      recreateAddComponent = false;
   }

   // Initialize all the variables
   init();
</script>
<!-- Main Repository section -->
<div class="col-10 text-center mb-2 p-0">
   <div class="row">
      <div class="col-12 mb-2">
         <div class="card">
            <div class="text-center mb-1">
               <h3 class="display-4 bg-light text-dark p-1">Repositories</h3>
               <p>View, Add and Search the repositories</p>
            </div>
         </div>
      </div>
   </div>
</div>
<!-- Repositories Modal -->
<div class="col-10 p-5">
   {#if repositories && repositories.length>0}
    <div class="row justify-content-between mb-4">
        <div class="col-7">
            <input id="search-box" class="form-control border border-warning" type="text" placeholder="Search..." bind:value={searchTerm}>
         </div>
         <div class="col-4">
            <button class="btn btn-warning float-right" on:click={showAddRepositoryModal}>
               <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                   <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 4)">
                       <path d="m10.5.5h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2z" transform="matrix(0 1 -1 0 13 0)"/>
                       <path d="m6.5 3.5v6.056"/><path d="m6.5 3.5v6" transform="matrix(0 1 -1 0 13 0)"/>
                   </g>
               </svg>  
               Add Repository
             </button>
         </div>
    </div>
    {#if  filteredRepositories.length>0}
    <div class="row" style="height: 400px; overflow-y: scroll;">
       <div class="col-12">
          <table class="table table-bordered">
             <thead>
                <tr>
                   <th scope="col">#</th>
                   <th scope="col">Repository Description</th>
                   <th scope="col">Repository Prefix</th>
                   <th scope="col">Base Branch</th>
                   <th scope="col">Edit</th>
                   <th scope="col">Delete</th>
                </tr>
             </thead>
             <tbody>
                {#each filteredRepositories as repository, i}  
                <tr>
                   <th scope="row">{i+1}</th>
                   <td>{repository.repoDesc}</td>
                   <td>{repository.repoPrefix}</td>
                   <td>{repository.baseName}</td>
                   <td>
                      <button type="button" class="btn btn-light" on:click="{()=>{editRepository(repository)}}">
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
                      <button type="button" class="btn btn-danger" on:click="{()=>{deleteRepository(repository)}}">
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
             <h4 class="col-12 text-info display-5 mb-4">Oops! Repository with the name {searchTerm} doesn't exist.</h4>
          </div>
       </div>
    </div>
    {/if}
    {:else}
    <div class="row">
       <div class="col-12 text-center">
          <div class="row justify-content-center">
             <h4 class="col-12 text-info display-5 mb-4">Oops! Looks like you haven't added any repositories yet.</h4>
             <div class="col-7">
                <button class="btn btn-warning" on:click={showAddRepositoryModal}> + Add Repository</button>
             </div>
          </div>
       </div>
    </div>
    {/if}
 </div>
 <!-- Add Repository Modal -->
 <div class="modal fade" id="add-repository" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             {#if recreateAddComponent == true} 
             <AddRepository 
                on:addRepository={addRepository}
                on:cancel={hideAddRepositoryModal}
                on:editRepository={updateRepository}
                repository={selectedRepository}
                />
            {/if}
          </div>
       </div>
    </div>
 </div>