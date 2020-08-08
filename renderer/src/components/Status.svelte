<script>
   export let artifacts, token, orgName;

   import Artifacts from './Artifacts.svelte';
   import AddArtifact from './AddArtifact.svelte';
   import Githubconfig from './Githubconfig.svelte';
   import Retrofitcheck from './Retrofitcheck.svelte';

   import { createEventDispatcher } from 'svelte';

   const dispatch = createEventDispatcher();

   let releaseDate, displayStatus;

   let headers = {
      accept: 'application/vnd.github.v3+json',
      authorization: `token ${token}`
   }
   async function getGitCompareStatus(artifact) {
      let response = await fetch(`https://api.github.com/repos/${orgName}/${artifact.repoName}/compare/${artifact.artPrefix}${releaseDate}...${artifact.baseName}`, {
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

   function toggleAddArtifactModal() {
      window.$('#add-artifact').modal('toggle');
   }

   function addArtifact(event) {
      init();
      toggleAddArtifactModal();
      dispatch('addArtifact', event.detail);
   }

   function goToArtifacts() {
      dispatch('goToArtifacts', {});
   }

   init();
</script>

<div class="col-10 p-0 mb-2">
   <div class="row">
      <div class="col-12">
         <div class="card">
            <div class="text-center mb-1">
               <h3 class="display-4 bg-light text-dark p-1">Status Checker</h3>
               <p>Details to be filled</p>
            </div>
         </div>
      </div>
   </div>
</div>
{#if artifacts && artifacts.length>0}
 {#if displayStatus==false}
 <Retrofitcheck 
    on:checkRetrofit={checkRetrofit} 
    on:goToArtifacts={goToArtifacts}
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
                <th scope="col">Artifact Name</th>
                <th scope="col">Branch Prefix</th>
                <th scope="col">Base Branch</th>
                <th scope="col">Release Branch</th>
                <th scope="col">Retrofit Status</th>
             </tr>
          </thead>
          <tbody>
             {#each artifacts as artifact, i}
             {#await getGitCompareStatus(artifact)}
             <tr>
                <th colspan="6" class="text-center">
                   <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                   </div>
                </th>
             </tr>
             {:then response}
             <tr 
                class:bg-success="{response.ahead_by == 0}"
                class:text-white="{response.ahead_by == 0 || (response.ahead_by && response.ahead_by != 0 
                || (response.message == 'Bad credentials')) }"
                class:bg-danger="{response.ahead_by && response.ahead_by != 0 
                || (response.message == 'Bad credentials')}"
                class:bg-warning="{response.message == 'Not Found'}"
                class:text-dark="{response.message == 'Not Found'}"
                >
                <th scope="row">{i+1}</th>
                <td>{artifact.artName}</td>
                <td>{artifact.artPrefix}</td>
                <td>{artifact.baseName}</td>
                <td>{artifact.artPrefix}{releaseDate}</td>
                {#if response.ahead_by == 0}
                <td class="text-success">Completed</td>
                {:else if response.message == "Not Found"}
                <td>Branch Doesn't exist</td>
                {:else if response.message == "Bad credentials"}
                <td>Bad Credentials</td>
                {:else}
                <td>Not Completed</td>
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
       <h4 class="col-12 text-info display-5 mb-4">Oops! Looks like you haven't added any artifacts yet.</h4>
       <div class="col-7">
          <button class="btn btn-warning" on:click={toggleAddArtifactModal}> + Add Artifact</button>
       </div>
    </div>
 </div>
 {/if}
 <!-- Add Artifact Modal -->
 <div class="modal fade" id="add-artifact" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
          <div class="modal-body">
             <AddArtifact 
                on:addArtifact={addArtifact}
                on:cancel={toggleAddArtifactModal}
                />
          </div>
       </div>
    </div>
 </div>