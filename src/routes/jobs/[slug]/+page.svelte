<script>
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from 'humanize-plus';
    import { GetUserId } from '../../../utils/auth.js';
    import { goto } from '$app/navigation';
    export let data;
    
    let isUser = GetUserId();

    function navigateToMainPage() {
        goto('/');
    }

    function navigateToEditPage() {
        goto(`/jobs/${data.job.id}/edit`);
    }
</script>

<div class="main-button">
    <button class="main-button theme-button" on:click={navigateToMainPage}> Jobseeker </button>
</div>

<div class="mt-10">
    <div class="flex">
        <div class="flex-1">
            <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
            <p class="text-xl">{data.job.employer}</p>
        </div>
    </div>

    <div class="flex flex-row w-full mt-8">
        <div class="basis-2/3 prose max-w-none w-full">
            <h2 class="text-xl font-thin">Description</h2>
            <SvelteMarkdown source={data.job.description} />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Requirements</h2>
            <SvelteMarkdown source={data.job.requirements} />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">How to Apply?</h2>
            <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
            <h2 class="text-xl font-thin">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Salary Range</h2>
            <p>
                USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
                    data.job.maxAnnualCompensation
                )}
            </p>
            
            {#if isUser === data.job.user}
            <div class="lower-content">
                <button on:click={navigateToEditPage} class="font-bold text-2xl">Edit</button>
            </div>
            {/if}
        </div>
    </div>
</div>
