import { allianceCodeMap } from "./constants";

export const replaceAllianceCode = (allianceName) => {
  const alliance = allianceName.replace(
    allianceName,
    (match) => allianceCodeMap[match]
  );
  return alliance;
};

export const checkLength = (code, codeLength) => {
  if (code.length > codeLength) {
    const newStr = code.substr(0, codeLength) + "...";
    return newStr;
  } else {
    return code;
  }
};

export const paginate = (airlines) => {
  const airlinesPerPage = 12;
  const pages = Math.ceil(airlines.length / airlinesPerPage);
  const newAirlines = Array.from({ length: pages }, (_, index) => {
    const start = index * airlinesPerPage;
    return airlines.slice(start, start + airlinesPerPage);
  });
  return newAirlines;
};
