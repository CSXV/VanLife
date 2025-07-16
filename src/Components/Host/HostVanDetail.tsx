import { Await, Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVanByID } from "../api";
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

export async function loader({ params, request }: any) {
  await requireAuth(request);

  return { van: getHostVanByID(params.id) };
}

const activeStyle = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#161616",
};

function HostVanDetail() {
  const vanData: vanType = useLoaderData();

  function renderHostVanDetails(van: vanType) {
    return (
      <>
        <Link to={`..`} className="back-button" relative="path">
          &larr; <span>Back to vans</span>
        </Link>

        <section className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={van.imageUrl}></img>

            <div className="host-van-detail-info-text">
              <i className={`van-type ${van.type} selected`}>{van.type}</i>

              <h3>{van.name}</h3>
              <h4>${van.price}/Day</h4>
            </div>
          </div>

          <nav className="host-van-detail-nav">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              end
              to="."
            >
              Details
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              end
              to="pricing"
            >
              Pricing
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              end
              to="photos"
            >
              Photos
            </NavLink>
          </nav>

          <Outlet context={{ van }} />
        </section>
      </>
    );
  }

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={vanData.van}>{renderHostVanDetails}</Await>
    </Suspense>
  );
}

export default HostVanDetail;
