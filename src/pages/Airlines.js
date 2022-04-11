import { useContext } from "react";
import { AirlineContext } from "../context/airline-context";
//components
import FilterAlliances from "../components/FilterAlliances";
import AirlinesList from "../components/AirlinesList";
import Loading from "../components/Loading";

export default function Airlines() {
  const { loading, filteredAlliance } = useContext(AirlineContext);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <h1>
            Airlines{" "}
            <span className="numAirlines">({filteredAlliance.length})</span>
          </h1>
          <FilterAlliances />
          <AirlinesList />
        </main>
      )}
    </>
  );
}
