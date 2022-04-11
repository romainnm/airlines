import { useContext } from "react";
import { AirlineContext } from "../context/airline-context";

export default function FilterAlliances() {
  const { uniqueAlliance, filterAlliances, allianceCheck } = useContext(
    AirlineContext
  );

  return (
    <div className="filter-alliances">
      <h3 className="filter-alliances__title">Filter by Alliances</h3>
      <div className="filter-alliances__container">
        {uniqueAlliance.map((alliance, index) => {
          return (
            <div key={index} className="filter-alliances__item">
              <input
                type="checkbox"
                id={alliance}
                name={alliance}
                onChange={(e) => filterAlliances(index)}
                checked={allianceCheck[index].status}
              />
              <label htmlFor="name">{alliance}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
