import { useState } from "react";

const COUNTRIES = ["Sweden", "China", "Brazil", "Australia"];

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const saveBox = (box) => {
  const boxes = JSON.parse(localStorage.getItem("boxes") || "[]");
  boxes.push(box);
  localStorage.setItem("boxes", JSON.stringify(boxes));
};

function AddBoxForm() {
  const [receiverName, setReceiverName] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [error, setError] = useState({});

  const validate = () => {
    const err = {};
    if (!receiverName) {
      err.receiverName = "Receiver name is required";
    }
    if (weight === "") {
      err.weight = "Weight is required";
    }
    if (Number(weight) < 0) {
      err.weight = "Weight must be a positive number";
    }
    if (!destinationCountry) {
      err.destinationCountry = "Destination country is required";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setError(err);
      if (err.weight && weight < 0) {
        setWeight(0);
      }
      return;
    }
    const payload = {
      receiverName,
      weight: Number(weight),
      color,
      destinationCountry,
    };
    saveBox(payload);
    setReceiverName("");
    setWeight("");
    setColor("#ffffff");
    setDestinationCountry("");
    setError({});
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid black",
          margin: "24px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <label htmlFor="name" placeholder="Enter name">
            Receiver name
          </label>
          <input
            type="text"
            name="name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          {error.receiverName && (
            <div style={{ color: "red" }}>{error.receiverName}</div>
          )}
        </div>
        <div>
          <label htmlFor="weight">Weight in kg</label>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          {error.weight && <div style={{ color: "red" }}>{error.weight}</div>}
        </div>
        <div>
          <label htmlFor="color">Box colour</label>
          <input
            type="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          <div>{hexToRgb(color)}</div>
        </div>
        <div>
          <label htmlFor="countries">Destination country</label>
          <select
            name="countries"
            id="countries"
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {error.destinationCountry && (
            <div style={{ color: "red" }}>{error.destinationCountry}</div>
          )}
        </div>
        <button type="submit">Add box</button>
      </form>
    </div>
  );
}

export default AddBoxForm;
