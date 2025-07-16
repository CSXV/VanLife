import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "./api";
import { Suspense } from "react";

interface vanType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

export function loader() {
  return { vans: getVans() };
}

// ------------------------------------------------------------------------------------------
function Vans() {
  const [searchPrams, setSearchPrams] = useSearchParams();
  const typeFilter = searchPrams.get("type");
  const vansData = useLoaderData();

  // ------------------------------------------------------------------------------------------
  function renderVansElements(vans: vanType[]) {
    const displayFilter = typeFilter
      ? vans.filter(
        (v: vanType) => v.type.toLowerCase() === typeFilter.toLowerCase(),
      )
      : vans;

    const vansElements = displayFilter.map((v: vanType) => (
      <div key={v.id} className="van-tile">
        <Link
          to={`${v.id}`}
          state={{ search: `?${searchPrams.toString()}`, type: typeFilter }}
        >
          <img loading="lazy" src={v.imageUrl} />

          <div className="van-info">
            <p>{v.name}</p>
            <p>${v.price}/day</p>
          </div>

          <i className={`van-type ${v.type} selected`}>{v.type}</i>
        </Link>
      </div>
    ));

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
            onClick={() => setSearchPrams({ type: "simple" })}
          >
            Simple
          </button>
          <button
            className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
            onClick={() => setSearchPrams({ type: "rugged" })}
          >
            Rugged
          </button>
          <button
            className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
            onClick={() => setSearchPrams({ type: "luxury" })}
          >
            Luxury
          </button>

          {typeFilter ? (
            <button
              className="van-type clear-filters"
              onClick={() => setSearchPrams({})}
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="van-list">{vansElements}</div>
      </>
    );
  }

  // ------------------------------------------------------------------------------------------
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={vansData.vans}>{renderVansElements}</Await>
      </Suspense>
    </div>
  );
}

export default Vans;
