<!-- src/routes/index.svelte -->
<script>
    import { isLoggedIn } from '$lib/stores/auth';
  
    function login() {
      // Perform login logic
  
      // Update the store to reflect the login status
      isLoggedIn.set(true);
    }
  
    function logout() {
      // Perform logout logic
  
      // Update the store to reflect the logout status
      isLoggedIn.set(false);
    }
  
    function signup() {
      // Perform signup logic
    }
  </script>
  
  <div>
    {#if $isLoggedIn}
      <!-- Show content for logged-in users -->
      <button on:click={logout}>Log Out</button>
    {:else}
      <!-- Show content for non-logged-in users -->
      <button on:click={login}>Log In</button>
      <button on:click={signup}>Sign Up</button>
    {/if}
  </div>
  