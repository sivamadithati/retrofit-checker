<!-- Jumbotron -->

<script>
    export let token, orgName;
</script>
<div class="jumbotron text-center p-4">
    <h1 class="display-4">Github Retrofit Checker</h1>
    <hr class="my-3">
    <p class="lead">Tool to check if the retrofit has been done from the base branch</p>
    {#if token && orgName}
    <div class="row justify-content-around">
        <span>Organization Name: <strong>{ orgName }</strong></span>
        <span>Token: <strong>{ token.substring(0, token.length-4).replace(/[a-zA-Z0-9]/g, "*") }{
                token.substring(token.length-4)
                }</strong></span>
    </div>
    {/if}
</div>