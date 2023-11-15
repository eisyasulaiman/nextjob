<script>
  import { alerts } from "../lib/stores/Alerts.svelte";
  
  let alertType = null;
  let alertMessage = null;

  // Setting local alertType and alertMessage whenever alerts.setAlert is called
  $: if ($alerts.type && $alerts.message) {
      alertType = $alerts.type;
      alertMessage = $alerts.message;
  }

  // Reset
  function resetAlerts() {
    if ($alerts.message && $alerts.type) {
      // local variable will get set immediately from the code at the top with $:. Once navigation happens, we clear the alerts store, but our local variable is not yet cleared, so it still shows on the page
      alerts.clearAlert();
    } else {
      // On subsequent page navigations, local variables to null so the alert div element gets hidden
      alertType = $alerts.type;
      alertMessage = $alerts.message;
    }
  }

  // This gets called as soon as navigation happens
  afterNavigate(() => resetAlerts());


</script>

{#if alertMessage}
<div class="alert {alertType} shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>{alertMessage}</span>
  </div>
</div>
{/if}