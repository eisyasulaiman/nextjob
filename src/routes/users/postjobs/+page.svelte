<script lang="ts">

function validateForm(compensation:number): boolean {
  if (compensation < 1000) {
    return false;
  } else {
    return true;
  }
}

    async function handleForm(evt) {
      let isSubmitting = false;
      let error = '';

    const formData = {
      minAnnual: evt.target['minAnnual'].value,
      maxAnnual: evt.target['maxAnnual'].value
    };  

    const res =  validateForm(Number(formData.minAnnual));

    if (res) {
      window.alert('Post Job successful!');
    } else {
      console.log('Post Job failed');
      error = 'Must be larger than 1000.00';
    }

    
  }
    
</script>
    
    <div class="flex justify-center items-center flex-col mt-8">
      <h1 class="text-center text-xl mb-4">Post a Job</h1>
    
      <form on:submit={handleForm} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="jobtitle">
            <span class="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="Job Title"
            placeholder="Software Engineer"
            class="input input-bordered w-full"
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="minAnnual">
            <span class="label-text">Min Annual Compensation</span>
          </label>
          <style>
    
          input[type=number]::-webkit-inner-spin-button {
            opacity: 1
        }</style>
    
        <input type="number" value="1" min="1" max="999"  name="Min Annual Compensation"
        placeholder="40000"
        class="input input-bordered w-full"/>
        
          <label class="label" for="salary"><span class="label-text-alt">USD</span> <span class="label-text-alt">per annum</span></label>
       </div>
    
        <div class="form-control w-full">
          <label class="label" for="maxAnnual">
            <span class="label-text">Max Annual Compensation</span>
          </label>
          <input
            type="number"
            name="Max Annual Compensation"
            placeholder="250000"
            class="input input-bordered w-full"
            required
          />
   
          <label class="label" for="salary"><span class="label-text-alt">USD</span> <span class="label-text-alt">per annum</span></label>
          <!-- {#if error}
            <label class="label" for="maxannual">
              <span class="label-text-alt text-red-500">{error}</span>
            </label>
          {/if} -->
        </div>
        <div class="form-control w-full">
          <label class="label" for="companyname">
            <span class="label-text">Company Name</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="e.g Facebook"
            class="input input-bordered w-full"
            required
          />
          <!-- {#if error}
            <label class="label" for="companyname">
              <span class="label-text-alt text-red-500">{error}</span>
            </label>
          {/if} -->
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="joblocation">
            <span class="label-text">Job Location</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="e.g Kuala Lumpur"
            class="input input-bordered w-full"
            required
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="Description">
            <span class="label-text">Description</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder=""
            class="input input-bordered w-full"
            required
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="requirement">
            <span class="label-text">Requirement</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder=""
            class="input input-bordered w-full"
            required
          />
          <!-- {#if error}
            <label class="label" for="requirement">
              <span class="label-text-alt text-red-500">{error}</span>
            </label>
          {/if} -->
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="applicationInstructions">
            <span class="label-text">Application Instructions</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder=""
            class="input input-bordered w-full"
            required
          />
       </div>
    
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Post a Job</button>
        </div>
      </form>
    </div>
    