<script>
  import "../app.css";
  import { IsLoggedIn } from '../lib/stores/auth';
  import { logOut} from '../utils/auth'
  import {goto} from '$app/navigation'
  
  function logUserOut(){
    logOut()
    goto('/users/login')
  }
</script>

<nav>
  <a href="/">Home</a>
  {#if $IsLoggedIn} 
    <button on:click={logUserOut}>Logout</button>
    <a href="/users/postjobs">Post a Job</a>

  {:else}
    <a href="/users/login">Login</a>
    <a href="/users/new">Sign Up</a>
    <a href="/users/postjobs">Post a Job</a>
  {/if}
</nav>


<slot />
