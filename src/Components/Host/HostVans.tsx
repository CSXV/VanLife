import { Await, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../api";
import { requireAuth } from "../Utils";
import { Suspense } from "react";

interface vanType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

export async function loader({ request }: any) {
  await requireAuth(request);

  return { vans: getHostVans() };
}

function HostVans() {
  const hostVansData = useLoaderData();

  function renderHostVansElements(hostVans: vanType) {
    const hostVansList = hostVans.map((v: vanType) => (
      <Link to={`${v.id}`} key={v.id} className="host-van-link-warpper">
        <div className="host-van-single">
          <img loading="lazy" src={v.imageUrl} />

          <div className="host-van-info">
            <p>{v.name}</p>
            <p>${v.price}/Day</p>
          </div>
        </div>
      </Link>
    ));

    return (
      <div className="host-vans-list">
        <section>{hostVansList}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={hostVansData.vans}>{renderHostVansElements}</Await>
      </Suspense>
    </section>
  );
}

export default HostVans;
