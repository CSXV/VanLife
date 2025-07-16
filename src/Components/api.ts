export async function getVans() {
  const res = await fetch("/api/vans");

  if (!res.ok) {
    throw {
      message: "failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data.vans;
}

export async function getVanByID(id: number) {
  const res = await fetch(`/api/vans/${id}`);

  if (!res.ok) {
    throw {
      message: "failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data.vans;
}

export async function getHostVans() {
  const res = await fetch(`/api/host/vans`);

  if (!res.ok) {
    throw {
      message: "failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data.vans;
}

export async function getHostVanByID(id: number) {
  const res = await fetch(`/api/host/vans/${id}`);

  if (!res.ok) {
    throw {
      message: "failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();
  return data.vans;
}

export async function loginUser(creds: any) {
  const response = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: response.statusText,
      status: response.status,
    };
  }

  return data;
}
