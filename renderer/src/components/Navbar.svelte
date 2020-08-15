<script>
    export let token, orgName;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let selectedTab;

    function goToRepositories() {
        selectedTab = 'repositories'; // Move to constants
        dispatch('goToRepositories', {});
    }
    function goToStatusPage() {
        selectedTab = 'check-status'; // Move to constants
        dispatch('goToStatusPage', {});
    }
    function goToHome() {
        selectedTab = 'home'; // Move to constants
        dispatch('goToHome', {});
    }

    function goToGithubConfig() {
        dispatch('goToGithubConfig', {});
    }

    function init() {
        selectedTab = 'home';
    }

    init();
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">
        <svg height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                transform="matrix(-1 0 0 1 17.335 3)">
                <path d="m12.835.5v5h-5" transform="matrix(1 0 0 -1 0 6)" />
                <path d="m7.006.429v8.485l5.657 5.657"
                    transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.183906 -4.757696)" />
                <path d="m.835 4.5 4-4" transform="matrix(-1 0 0 1 5.669 0)" />
            </g>
        </svg>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    {#if token && orgName}
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" class:active="{selectedTab=='home'}">
                <a class="nav-link" href="#" on:click={goToHome}>Home</a>
            </li>
            <li class="nav-item" class:active="{selectedTab=='repositories'}">
                <a class="nav-link" href="#" on:click={goToRepositories}>Repositories</a>
            </li>
            <li class="nav-item" class:active="{selectedTab=='check-status'}">
                <a class="nav-link" href="#" on:click={goToStatusPage}>Check Status</a>
            </li>
        </ul>
        <button class="btn" on:click={goToGithubConfig}>
            <svg height="25" viewBox="0 0 21 21" width="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                    transform="translate(2 2)">
                    <circle cx="8.5" cy="8.5" r="8" />
                    <path
                        d="m14.5 13.5c-.6615287-2.2735217-3.1995581-3.0251263-6-3.0251263-2.72749327 0-5.27073171.8688092-6 3.0251263m6-11c1.6568542 0 3 1.34314575 3 3v1c0 1.65685425-1.3431458 3-3 3-1.65685425 0-3-1.34314575-3-3v-1c0-1.65685425 1.34314575-3 3-3z" />
                </g>
            </svg>
        </button>
    </div>
    {/if}
</nav>