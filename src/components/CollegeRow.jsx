/* eslint-disable react/prop-types */
import React from "react";

const CollegeRow = ({ college }) => {
  return (
    <tr>
      <td style={styles.cell}>#{college.cdRank}</td>
      <td style={styles.cell}>
        <div className="d-flex">
          <img
            src={college.imageUrl}
            alt={college.collegeName}
            style={styles.image}
          />
          <div className="college-name">
            <h4 className="text-lg font-weight-medium">
              {" "}
              {college.collegeName}
            </h4>
            <div className="text-sm">
              {college.city}, {college.state}
            </div>
          </div>
        </div>
      </td>
      <td style={styles.cell}>
        <div className="course-fees">
          <span className="d-block green-text mb-1 text-dark-green font-weight-bold">
            ₹ {college.averageFees}
          </span>
          <span className="d-block text-sm ">{college.topCourses[0]}</span>
        </div>
      </td>
      <td style={styles.cell}>
        {college.placementStats.averagePackage &&
        college.placementStats.highestPackage ? (
          <>
            <div>
             <div className="d-block mb-1 text-green"> ₹ {college.placementStats.averagePackage}</div>
              <div className="text-sm mb-1">Average Package</div>
            </div>
            <div>
             <div className="d-block mb-1 text-green"> ₹ {college.placementStats.highestPackage}</div>
             <div className="text-sm mb-1">Highest Package</div>
            </div>
          </>
        ) : college.placementStats.averagePackage ? (
          <div>
            <div className="d-block mb-1 text-green"> ₹ {college.placementStats.averagePackage}</div>
            <div className="text-sm mb-1">Average Package</div>
            </div>
        ) : college.placementStats.highestPackage ? (
          <div>
            <div className="d-block mb-1 text-green"> ₹ {college.placementStats.highestPackage}</div>
             <div className="text-sm mb-1">Highest Package</div>
            </div>
        ) : (
          <div>No Placement Data Available</div>
        )}
      </td>
      <td style={styles.cell}>
        <span className="d-block mb-1">{college.rating} / 5</span>
        <span className="d-block text-sm mb-1">Based on 589 User Reviews</span>
      </td>
      <td style={styles.cell}>
        <span className="text-gray-dark">
          <span className="rank-college text-lg text-gray-dark">
            #{college.ranking}
            <sup>th</sup>/ <span className="text-yellow">745</span>
          </span>
           in India
        </span>
      </td>
    </tr>
  );
};

const styles = {
  cell: {
    border: "1px solid #dedede",
    padding: "8px 14px 20px 14px",
  },
  image: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    verticalAlign: "middle",
  },
};

export default CollegeRow;
