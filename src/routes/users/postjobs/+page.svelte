<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { authenticateUser, isLoggedIn  ,GetUserId } from './../../../utils/auth.js';
  import { alerts } from "./../lib/stores/Alerts.svelte";

let formErrors = {}; //Initialize form as empty object
let minAnnual=1;
let maxAnnual=1;
let id="";
let jobURL="/jobs/";

function postCreateJob(id) { // function to navigate to main page after signing up
  goto(jobURL);
}

async function createJob(evt) { // async fx  to handle user creation post sign up
  evt.preventDefault(); //prevent default form submission to avoid page refresh
  
  //create an oject with user data from the form
  const userData = {
    title: evt.target['jobtitle'].value,
    minAnnualCompensation: evt.target['minAnnual'].value,
    maxAnnualCompensation: evt.target['maxAnnual'].value,
    employer: evt.target['companyName'].value,
    location: evt.target['joblocation'].value,
    description: evt.target['description'].value,
    requirements: evt.target['requirement'].value,
    applicationInstructions: evt.target['applicationInstructions'].value,
    user: GetUserId(),

  };

  //send a POST req  to create a new job
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(userData)
  });

  //check response status
  if (resp.status == 200) {
    const res = await resp.json();
    id=res.id 
    // idReturned= resp.data.id 
    // const res = await authenticateUser(userData.username, userData.password);
    console.log("YAY");
    console.log(id);
    jobURL+=id;
    postCreateJob(id);

  } else {
  //if there's an error, parse the response body as JSON and set formErrors
    const res = await resp.json();
    formErrors = res.data;
  }
}

</script>

    <div class="flex justify-center items-center flex-col mt-8">
      <h1 class="text-center text-xl mb-4">Post a Job</h1>
    
      <form on:submit={createJob} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="jobtitle">
            <span class="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="jobtitle"
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
              opacity: 1;
            }
          </style>

        <input bind:value={minAnnual} id="minAnnual" type="number" name="minAnnual"
        placeholder="40000"
        class="input input-bordered w-full"/>
        {#if minAnnual <= 1000}
    <h2 style="color:red">bruh salary too  low!</h2>
{/if}
          <label class="label" for="salary"><span class="label-text-alt">USD</span> <span class="label-text-alt">per annum</span></label>
       </div>
    
        <div class="form-control w-full">
          <label class="label" for="maxAnnual">
            <span class="label-text">Max Annual Compensation</span>
          </label>
          <input
            type="number"
            name="maxAnnual"
            placeholder="250000"
            class="input input-bordered w-full"
            required
          />
          {#if maxAnnual <= 1000}
          <h2 style="color:red">bruh salary too  low!</h2>
          {/if}

          <label class="label" for="salary"><span class="label-text-alt">USD</span> <span class="label-text-alt">per annum</span></label>
         
        </div>
        <div class="form-control w-full">
          <label class="label" for="companyName">
            <span class="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="e.g Facebook"
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
            placeholder="e.g Kuala Lumpur"
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
            type="paragraph"
            name="requirement"
            placeholder=""
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
            placeholder=""
            class="input input-bordered w-full"
            required/>
       </div>
    
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Post a Job</button>
        </div>
      </form>

</div>
   