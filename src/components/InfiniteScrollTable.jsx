import React, { useState, useEffect, useCallback } from "react";
import CollegeTable from "./CollegeTable";
import Loader from "./Loader";
import data from "../data/colleges.json";

const InfiniteScrollTable = () => {
  const [displayedData, setDisplayedData] = useState([]); 
  const [rowsToShow, setRowsToShow] = useState(10); 
  const [loading, setLoading] = useState(false); 

  
  const loadMoreData = useCallback(() => {
    if (rowsToShow < data.length) {
      setLoading(true);
      setTimeout(() => {
        setRowsToShow((prev) => Math.min(prev + 2, data.length)); 
        setLoading(false);
      }, 500); 
    }
  }, [rowsToShow]);


  useEffect(() => {
    setDisplayedData(data.slice(0, rowsToShow)); 
  }, [rowsToShow]);


  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50 &&
      !loading
    ) {
      loadMoreData();
    }
  }, [loadMoreData, loading]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <CollegeTable colleges={displayedData} />
      {loading && <Loader />}
    </>
  );
};

export default InfiniteScrollTable;
