import { useEffect, useState } from "react";

const countryMultipliers = {
  Sweden: 7.35,
  China: 11.53,
  Brazil: 15.63,
  Australia: 50.09,
};

const style = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
};

function BoxListTable() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const getBoxes = () => {
      const storedBoxes = JSON.parse(localStorage.getItem("boxes") || "[]");
      setBoxes(storedBoxes);
    };
    getBoxes();
  }, []);

  return (
    <div style={{ marginTop: "24px" }}>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.th}>Receiver name</th>
            <th style={style.th}>Weight in kilograms</th>
            <th style={style.th}>Box color</th>
            <th style={style.th}>Destination Country</th>
            <th style={style.th}>Calculated shipping cost in INR</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, index) => {
            return (
              <tr key={index}>
                <td style={style.td}>{box.receiverName}</td>
                <td style={style.td}>{box.weight}</td>
                <td style={{ ...style.td, backgroundColor: box.color }}></td>
                <td style={style.td}>{box.destinationCountry}</td>
                <td style={style.td}>
                  INR {box.weight * countryMultipliers[box.destinationCountry]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BoxListTable;
