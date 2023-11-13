<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { GetUserId } from './../../../utils/auth.js';
  
    let formErrors = {};
    let minAnnual = 1;
    let maxAnnual = 1;
    let id = "";
    let jobURL = "/jobs/";
  
    function postCreateJob(id) {
      goto(jobURL);
    }
  
    async function createJob(evt) {
      evt.preventDefault();
  
      const form = evt.target.elements;
  
      if (!form.checkValidity()) {
        return;
      }
  
      const userData = {
        title: form.jobtitle.value,
        minAnnualCompensation: form.minAnnual.value,
        maxAnnualCompensation: form.maxAnnual.value,
        employer: form.companyName.value,
        location: form.joblocation.value,
        description: form.description.value,
        requirements: form.requirement.value,
        applicationInstructions: form.applicationInstructions.value,
        user: GetUserId(),
      };
  
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (resp.status === 200) {
        const res = await resp.json();
        id = res.id;
        jobURL += id;
        postCreateJob(id);
      } else {
        const res = await resp.json();
        formErrors = res.data;
      }
    }
  
    async function updateJob(evt) {
      evt.preventDefault();
  
      const form = evt.target.elements;
  
      if (!form.checkValidity()) {
        return;
      }
  
      const updatedData = {
        title: form.jobtitle.value,
        minAnnualCompensation: form.minAnnual.value,
        maxAnnualCompensation: form.maxAnnual.value,
        employer: form.companyName.value,
        location: form.joblocation.value,
        description: form.description.value,
        requirements: form.requirement.value,
        applicationInstructions: form.applicationInstructions.value,
        user: GetUserId(),
      };
  
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (resp.status === 200) {
        const res = await resp.json();
        // Handle success
        console.log('Job updated successfully:', res.data);
      } else {
        const res = await resp.json();
        // Handle error
        console.error('Error updating job:', res.error);
      }
    }
  </script>
  
  <div class="flex justify-center items-center flex-col mt-8">
    <h1 class="text-center text-xl mb-4">Post a Job</h1>
  
    <form on:submit={createJob} class="w-1/3">
      <!-- Your form inputs -->
      <div class="form-control w-full mt-4">
        <button class="btn btn-md">Post a Job</button>
      </div>
    </form>
  
    <!-- Edit button and update form -->
    {#if id}
      <button on:click={() => goto(`/jobs/${id}/update`)} class="btn btn-md mt-4">Edit Job</button>
      
      <form on:submit={updateJob} class="w-1/3">
        <!-- Your form inputs with default values from the existing job data -->
        <div class="form-control w-full mt-4">
          <button class="btn btn-md">Update Job</button>
        </div>
      </form>
    {/if}
  </div>
  