import React, { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import { replaceAllianceCode, paginate } from "../utils/helpers";
const AirlineContext = React.createContext();

function AirlineProvider({ children }) {
  /* ==== States and Variables ==== */
  const [airlines, setAirlines] = useState([]);
  const [filteredAlliance, setFilteredAlliance] = useState([]);
  const [alliancePaginated, setAlliancePaginated] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allianceCheck, setAllianceCheck] = useState([]);
  const [page, setPage] = useState(0);
  // Get Unique Alliance Value and order by a-z
  const uniqueAlliance = [
    ...new Set(
      airlines
        .filter((airline) => airline.alliance !== "none")
        .map((airline) => replaceAllianceCode(airline.alliance))
        .sort()
    )
  ];

  /* ==== Fetching Data ==== */
  const fetchAirlines = () => {
    fetchJsonp("https://kayak.com/h/mobileapis/directory/airlines/homework", {
      jsonpCallback: "jsonp"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setLoading(true);
        setAirlines(data);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /* ==== Functions ==== */
  const filterAlliances = (position) => {
    const updateAllianceCheck = allianceCheck.map((alliance, index) =>
      index === position
        ? { ...alliance, status: !alliance.status }
        : { ...alliance, status: alliance.status }
    );
    resetCurrentAndPage();
    setAllianceCheck(updateAllianceCheck);
  };
  const resetCurrentAndPage = () => {
    setPage(0);
    setCurrentList([]);
  };

  /* ==== UseEffects ==== */
  // Infinite Scroll
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setPage((prev) => prev + 1);
      } else if (window.scrollY === 0) {
        setPage(0);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  //Paginate list
  useEffect(() => {
    setAlliancePaginated(paginate(filteredAlliance));
  }, [filteredAlliance]);

  // Filtering airlines
  useEffect(() => {
    // Get only name of alliances checked
    const getAllianceChecked = allianceCheck
      .filter((alliance) => alliance.status)
      .map((alliance) => alliance.name);

    // Behavior when nothing is checked
    if (getAllianceChecked.length <= 0) {
      setFilteredAlliance(airlines);
    } else {
      // Behavior when at least one is checked
      let filter = airlines.filter((airline) =>
        getAllianceChecked.includes(replaceAllianceCode(airline.alliance))
      );
      setFilteredAlliance(filter);
    }
    // eslint-disable-next-line
  }, [allianceCheck]);

  // Set Current list to displayed
  useEffect(() => {
    if (alliancePaginated.length > 0) {
      if (currentList.length === 0) {
        const newCurrent = alliancePaginated[page];
        setCurrentList(newCurrent);
      } else if (page < alliancePaginated.length) {
        let newCurrent = [
          ...new Set([...currentList, ...alliancePaginated[page]])
        ];
        setCurrentList(newCurrent);
      } else {
        return currentList;
      }
    }
    // eslint-disable-next-line
  }, [alliancePaginated, page]);

  // Set Default values for alliances checkboxes
  useEffect(() => {
    setAllianceCheck(
      uniqueAlliance.map((alliance) => {
        return {
          name: alliance,
          status: false
        };
      })
    );
    // eslint-disable-next-line
  }, [airlines]);

  // Fetching data with fetch-jsonp
  useEffect(() => {
    fetchAirlines();
  }, []);

  return (
    <AirlineContext.Provider
      value={{
        loading,
        airlines,
        uniqueAlliance,
        filterAlliances,
        filteredAlliance,
        allianceCheck,
        alliancePaginated,
        currentList,
        page
      }}
    >
      {children}
    </AirlineContext.Provider>
  );
}

export { AirlineProvider, AirlineContext };
