import { useOutletContext } from "react-router-dom";

function HostVanPricing() {
  const { van } = useOutletContext<any>();

  return (
    <div>
      <h3 className="host-van-price">
        ${van.price}
        <span>/Day</span>
      </h3>
    </div>
  );
}

export default HostVanPricing;
