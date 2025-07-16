import { useOutletContext } from "react-router-dom";

function HostVanInfo() {
  const { van } = useOutletContext<any>();

  console.log(van);

  return (
    <div>
      <section className="host-van-detail-info">
        <h4>
          Name: <span>{van.name}</span>
        </h4>
        <h4>
          Category: <span>{van.type}</span>
        </h4>
        <h4>
          Description: <span>{van.description}</span>
        </h4>
        <h4>
          Visibility: <span>public</span>
        </h4>
      </section>
    </div>
  );
}

export default HostVanInfo;
