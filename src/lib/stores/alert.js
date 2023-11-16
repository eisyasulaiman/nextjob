import { writable } from "svelte/store";

  function initializeAlertStore(){ //initialized svelte store for managing alerts
    const defaultValue = { message: null, type: null }; //
    const { subscribe, set } = writable(defaultValue); //suscribe to reactively 

    return {
      subscribe,
      setAlert: (message, type) => set({ message, type }),
      clearAlert: () => set(defaultValue)
    };
  }

  export const alerts = initializeAlertStore();