<script>
   export let repositories, token, orgName;

   import AddRepository from './AddRepository.svelte';
   import Githubconfig from './Githubconfig.svelte';
   import Retrofitcheck from './Retrofitcheck.svelte';

   import { createEventDispatcher } from 'svelte';

   const dispatch = createEventDispatcher();

   let releaseDate, displayStatus;

   let headers = {
      accept: 'application/vnd.github.v3+json',
      authorization: `token ${token}`
   }
   async function getGitCompareStatus(repository) {
      let response = await fetch(`https://api.github.com/repos/${orgName}/${repository.repoName}/compare/${repository.repoPrefix}${releaseDate}...${repository.baseName}`, {
         method: 'GET',
         headers: headers
      });

      return response.json();
   }

   function checkRetrofit(event) {
      displayStatus = true;
      releaseDate = event.detail.date;
   }

   function init() {
      displayStatus = false;
      releaseDate = '';
   }

   function toggleAddRepositoryModal() {
      window.$('#add-repository').modal('toggle');
   }

   function addRepository(event) {
      init();
      toggleAddRepositoryModal();
      dispatch('addRepository', event.detail);
   }

   function goToRepositories() {
      dispatch('goToRepositories', {});
   }

   init();
</script>

<div class="col-10 p-0 mb-2">
   <div class="row">
      <div class="col-12">
         <div class="card">
            <div class="text-center mb-1">
               <h3 class="display-4 bg-light text-dark p-1">Status Checker</h3>
               <p>Check the retrofit status for any release date</p>
            </div>
         </div>
      </div>
   </div>
</div>
{#if repositories && repositories.length>0}
 {#if displayStatus==false}
 <Retrofitcheck 
    on:checkRetrofit={checkRetrofit} 
    on:goToRepositories={goToRepositories}
    />
 {:else}
 <div class="col-10 my-4">
    <button type="submit" class="float-right btn btn-warning" on:click={init}>
       <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="8.5" cy="8.5" r="5"/>
             <path d="m17.571 17.5-5.571-5.5"/>
          </g>
       </svg>
       Check Another Release
    </button>
 </div>
 <div class="col-10">
    <div class="row justify-content-center p-3" style="height: 400px; overflow-y: scroll;">
       <table class="table table-bordered">
          <thead>
             <tr>
                <th scope="col">#</th>
                <th scope="col">Repository Description</th>
                <th scope="col">Repository Prefix</th>
                <th scope="col">Base Branch</th>
                <th scope="col">Release Branch</th>
                <th scope="col">Retrofit Status</th>
             </tr>
          </thead>
          <tbody>
             {#each repositories as repository, i}
             {#await getGitCompareStatus(repository)}
             <tr>
                <th colspan="6" class="text-center">
                   <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                   </div>
                </th>
             </tr>
             {:then response}
             <tr 
                class:alert-success="{response.ahead_by == 0}"
                class:alert-danger="{response.ahead_by && response.ahead_by > 0 
                || response.message && response.message != 'Not Found'}"
                class:alert-warning="{response.message == 'Not Found'}"
                class="alert"
                >
                <th scope="row">{i+1}</th>
                <td>{repository.repoDesc}</td>
                <td>{repository.repoPrefix}</td>
                <td>{repository.baseName}</td>
                <td>{repository.repoPrefix}{releaseDate}</td>
                {#if response.ahead_by == 0}
                <td>Completed</td>
                {:else if response.message == "Not Found"}
                <td>Branch Doesn't exist</td>
                {:else if response.message == "Bad credentials"}
                <td>Bad Credentials</td>
                {:else if response.ahead_by && response.ahead_by > 0}
                <td>Not Completed</td>
                {:else}
                <td>Error occurred: {response.message}</td>
                {/if}
             </tr>
             {:catch error}
             <tr class="text-danger">Error occured {error.message}</tr>
             {/await}
             {/each}
          </tbody>
       </table>
    </div>
 </div>
 {/if}
 {:else}
 <div class="col-10 text-center p-5">
    <div class="row justify-content-center">
       <h4 class="col-12 text-info display-5 mb-4">Oops! Looks like you haven't added any repositories yet.</h4>
       <div class="col-7">
          <button class="btn btn-warning" on:click={toggleAddRepositoryModal}> + Add Repository</button>
       </div>
    </div>
 </div>
 {/if}
 <!-- Add Repository Modal -->
 <div class="modal fade" id="add-repository" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             <AddRepository 
                on:addRepository={addRepository}
                on:cancel={toggleAddRepositoryModal}
                />
          </div>
       </div>
    </div>
 </div>