import React, { useState, useEffect, useRef } from "react";
import CollegeRow from "./CollegeRow";

const CollegeTable = ({ colleges }) => {
  const [sortedColleges, setSortedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState({ key: null, order: "asc" });
  const debounceTimer = useRef(null); 

  useEffect(() => {
    setSortedColleges(colleges);
  }, [colleges]);

  const handleSort = (key) => {
    const isAscending = sortOrder.key === key && sortOrder.order === "asc";
    const sorted = [...sortedColleges].sort((a, b) => {
      let aValue = getValueByKey(a, key);
      let bValue = getValueByKey(b, key);


      aValue = aValue == null ? 0 : aValue;
      bValue = bValue == null ? 0 : bValue;


      if (typeof aValue === "string") aValue = parseFloat(aValue.replace(/,/g, "")) || 0;
      if (typeof bValue === "string") bValue = parseFloat(bValue.replace(/,/g, "")) || 0;

      return isAscending ? aValue - bValue : bValue - aValue;
    });

    setSortedColleges(sorted);
    setSortOrder({ key, order: isAscending ? "desc" : "asc" });
  };

  const getValueByKey = (obj, key) => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);


    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }


    debounceTimer.current = setTimeout(() => {
      const filtered = colleges.filter((college) =>
        college.collegeName.toLowerCase().includes(query)
      );
      setSortedColleges(filtered);
    }, 500); 
  };

  return (
    <>
      <div className="college-table-layout">
        <div className="college-table-container d-flex">
          <div className="controls">
            <input
              type="text"
              placeholder="Search by College Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="sorting-wrapper d-flex align-items-center">
            <h4 style={{ marginBottom: "0px" }}>Sort By</h4>
            <div className="sorting-button">
              <button
                className={sortOrder.key === "rating" ? "active" : ""}
                onClick={() => handleSort("rating")}
              >
                Rating {sortOrder.key === "rating" ? (sortOrder.order === "asc" ? "↑" : "↓") : ""}
              </button>
              <button
                className={sortOrder.key === "averageFees" ? "active" : ""}
                onClick={() => handleSort("averageFees")}
              >
                College Fees {sortOrder.key === "averageFees" ? (sortOrder.order === "asc" ? "↑" : "↓") : ""}
              </button>
              <button
                className={sortOrder.key === "ranking" ? "active" : ""}
                onClick={() => handleSort("ranking")}
              >
                Ranking {sortOrder.key === "ranking" ? (sortOrder.order === "asc" ? "↑" : "↓") : ""}
              </button>
              <button
                className={sortOrder.key === "placementStats.highestPackage" ? "active" : ""}
                onClick={() => handleSort("placementStats.highestPackage")}
              >
                Highest Package {sortOrder.key === "placementStats.highestPackage" ? (sortOrder.order === "asc" ? "↑" : "↓") : ""}
              </button>
            </div>
          </div>
        </div>
        <div className="college-table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={styles.headerCell}>CD Rank</th>
                <th style={styles.headerCell}>Colleges</th>
                <th style={styles.headerCell}>Course Fees</th>
                <th style={styles.headerCell}>Placement</th>
                <th style={styles.headerCell}>User Reviews</th>
                <th style={styles.headerCell}>Ranking</th>
              </tr>
            </thead>
            <tbody>
              {sortedColleges.map((college, index) => (
                <CollegeRow key={index} college={college} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const styles = {
  headerCell: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#88bdc4",
    color: "#fff",
    fontWeight: "400",
  },
};

export default CollegeTable;
