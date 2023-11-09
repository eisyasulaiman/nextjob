<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { authenticateUser } from './../../../utils/auth.js';
  import { IsLoggedIn } from '$lib/stores/auth';

  let formErrors = {};

  function postSignUp() {
    goto('/');
  }

  async function createUser(evt) {
    evt.preventDefault();

    if (evt.target['password'].value != evt.target['password-confirmation'].value) {
      formErrors['password'] = { message: 'Password confirmation does not match' };
      return;
    }

    const userData = {
      username: evt.target['username'].value,
      email: evt.target['email'].value,
      password: evt.target['password'].value,
      passwordConfirm: evt.target['password-confirmation'].value
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (resp.status == 200) {
      const res = await authenticateUser(userData.username, userData.password);

      if (res.success) {
        postSignUp();
      } else {
        throw 'Sign up succeeded but authentication failed';
      }
    } else {
      const res = await resp.json();
      formErrors = res.data;
    }
  }
</script>

<nav>
  <a href="/">Home</a>
  {#if $IsLoggedIn} <!-- Show different buttons based on login state -->
    <!-- You can add a logout button here if needed -->
  {:else}
    <a href="/users/login">Login</a>
    <a href="/users/new">Sign Up</a>
  {/if}
</nav>

<h1>Create an Account</h1>

<h1 class="text-center text-xl">Create an Account to Post a Job</h1>
<div class="text-center">
  <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
  <form on:submit={createUser} class="w-1/3">
    <!-- Your form controls here -->
  </form>
</div>
