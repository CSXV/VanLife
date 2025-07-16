import { useOutletContext } from "react-router-dom";

function HostVanPhotos() {
  const { van } = useOutletContext<any>();

  return (
    <div>
      <img className="host-van-detail-image" src={van.imageUrl}></img>
    </div>
  );
}

export default HostVanPhotos;
