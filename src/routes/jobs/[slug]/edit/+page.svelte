<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getTokenFromLocalStorage } from '../../../../utils/auth.js';
    export let data;

    console.log(data.jobs.id);

    let id = data.jobs.id;
    let title = data.jobs.title;
    let minAnnualCompensation = data.jobs.minAnnualCompensation;
    let maxAnnualCompensation = data.jobs.maxAnnualCompensation;
    let employer = data.jobs.companyName;
    let location = data.jobs.location;
    let description = data.jobs.description;
    let requirements = data.jobs.requirements;
    let applicationInstructions = data.jobs.applicationInstructions;
  
    async function handleEdit(evt) {
      evt.preventDefault();
  
      const data = {
      title: title,
      minAnnualCompensation: minAnnualCompensation,
      maxAnnualCompensation: maxAnnualCompensation,
      employer: employer,
      location: location,
      description: description,
      requirements: requirements,
      applicationInstructions: applicationInstructions
    };

      const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}/api/collections/jobs/records/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': getTokenFromLocalStorage() 
      },
      body: JSON.stringify(data),
    });

    console.log('Server response:', resp);

    if (resp.ok) {
      goto(`/`);
    } else {
      console.error('Update failed:', resp.status);
    }
  }
  
  </script>
 
  <div class="flex justify-center items-center flex-col mt-8">
    <h1 class="text-center text-xl mb-4">Update Job</h1>

      <form on:submit={handleEdit} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="jobtitle">
            <span class="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="jobtitle"
            bind:value={title}
            class="input input-bordered w-full"
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="minAnnual">
            <span class="label-text">Min Annual Compensation</span>
          </label>
          <input type="number" bind:value={minAnnualCompensation} required class="input input-bordered w-full" />
          <small>USD min. 1000</small> 
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="maxAnnual">
            <span class="label-text">Max Annual Compensation</span>
          </label>
          <input type="number" bind:value={maxAnnualCompensation} required class="input input-bordered w-full" />
          <small>USD min. 1000</small>
        </div>

        <div class="form-control w-full">
          <label class="label" for="companyName">
            <span class="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="companyName"
            bind:value={employer}
            class="input input-bordered w-full"
            required />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="joblocation">
            <span class="label-text">Job Location</span>
          </label>
          <input
            type="text"
            name="joblocation"
            bind:value={location}
            class="input input-bordered w-full"
            required
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Description</span>
          </label>
          <input
            type="paragraph"
            name="description"
            bind:value={description}
            class="input input-bordered w-full"
            required
          />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="requirement">
            <span class="label-text">Requirement</span>
          </label>
          <input
            type="paragraph"
            name="requirement"
            bind:value={requirements}
            class="input input-bordered w-full"
            required />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="applicationInstructions">
            <span class="label-text">Application Instructions</span>
          </label>
          <input
            type="paragraph"
            name="applicationInstructions"
            bind:value={applicationInstructions}
            class="input input-bordered w-full"
            required/>
            <small>At least 10 characters</small>
       </div>
    
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Submit</button>
        </div>
      </form>
  </div>

 
  