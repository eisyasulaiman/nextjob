<script>
  import { afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { alerts } from '../../../lib/stores/alert';
  import { IsLoggedIn } from '../../../lib/stores/auth';
  import { authenticateUser, logOut } from '../../../utils/auth';

  let username = '';
  let password = '';
  let error = '';
  let isSubmitting = false;

  function navigateToMainPage() {
    logOut(); 
    goto('/users/login');
  }

  async function handleLogin(evt) {
    isSubmitting = true;

    const userData = {
      username: evt.target['username'].value,
      password: evt.target['password'].value
    };

    const res = await authenticateUser(userData.username, userData.password);

    if (res.success) {
    
    alerts.setAlert('Login successful!', 'success');
    
    //clear alert after 5 seconds
    afterUpdate(() => {
        setTimeout(() => {
            alertMessage = null;
        }, 5000);
    });
    goto('/');
    
  } else {
    console.log('Login failed');
    alerts.setAlert('Invalid credentials. Please try again.', 'error');
  }
  afterUpdate(() => {
        setTimeout(() => {
            alertMessage = null;
        }, 5000);
    });
}

</script>

<div class="flex justify-center items-center flex-col mt-8">
  <h1 class="text-center text-xl mb-4">Login Page</h1>

  <form on:submit={handleLogin} class="w-1/3">
    <div class="form-control w-full">
      <label class="label" for="username">
        <span class="label-text">Username</span>
      </label>
      <input
        type="text"
        name="username"
        placeholder="johndoe"
        class="input input-bordered w-full"
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="password">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        name="password"
        placeholder=""
        class="input input-bordered w-full"
        required
      />
      {#if error}
        <label class="label" for="password">
          <span class="label-text-alt text-red-500">{error}</span>
        </label>
      {/if}
    </div>

    <div class="form-control w-full mt-4">
        <button class="btn btn-md">Login</button>
    </div>
  </form>
</div>
