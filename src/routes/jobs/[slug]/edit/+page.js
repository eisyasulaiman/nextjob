// import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

// export async function load({ params }) {
//   const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

//   if (resp.ok) {
//     const jobs = await resp.json();
//     return { props: { jobs } };
//   } else {
//     return { status: resp.status, error: new Error(`Failed to load job: ${resp.statusText}`) };
//   }
// }

import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ patch, params }) {
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      jobs: res
    }
  } else {
    return {
      jobs: []
    }
  }
}