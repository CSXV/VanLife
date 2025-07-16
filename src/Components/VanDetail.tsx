import { Await, Link, useLoaderData, useLocation } from "react-router-dom";
import { getVanByID } from "./api";
import { Suspense } from "react";

interface vanType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

export function loader({ params }: any) {
  return { van: getVanByID(params.id) };
}

function VanDetail() {
  const vanData = useLoaderData();
  const location = useLocation();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  function renderVanDetail(van: vanType) {
    return (
      <div className="van-detail-container">
        <Link to={`..${search}`} className="back-button" relative="path">
          &larr; <span>Back to {type} vans</span>
        </Link>

        <div className="van-detail">
          <img src={van.imageUrl}></img>

          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>

          <p className="van-price">${van.price}/Day</p>
          <p>{van.description}</p>

          <button className="link-button">Rent this van</button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={vanData.van}>{renderVanDetail}</Await>
    </Suspense>
  );
}

export default VanDetail;
