import { useContext } from "react";
import { AirlineContext } from "../context/airline-context";
import AirlineCard from "./AirlineCard";

export default function AirlinesList() {
  const { currentList } = useContext(AirlineContext);
  return (
    <section className="airlines-list">
      {currentList?.map((airline) => {
        return <AirlineCard key={airline.code} {...airline} />;
      })}
    </section>
  );
}
