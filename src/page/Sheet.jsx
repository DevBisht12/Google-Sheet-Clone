import { useState, useEffect, useRef, useContext } from "react";
import { inputContext } from "../context/sheetContext.jsx";
import "../Style/Sheet.css";

const Sheet = () => {
  const [alphabet, setAlphabet] = useState([]);
  const [serialNumber, setSerialNumber] = useState([]);
  const [curentIndex, setCurentIndex] = useState();
  const [addRow, setAddRow] = useState(0);
  const [totalRowCount, setTotalRowCount] = useState(100);
  const isInitialized = useRef(false);
  const styleInputs = useRef([]);
  const contextData = useContext(inputContext);

  useEffect(() => {
    if (!isInitialized.current) {
      const tempAlphabet = [];
      const tempSerialNumber = [];
      for (let i = 65; i <= 90; i++) tempAlphabet.push(String.fromCharCode(i));
      for (let i = 1; i <= totalRowCount; i++) tempSerialNumber.push(i);
      setAlphabet(tempAlphabet);
      setSerialNumber(tempSerialNumber);
    }
  }, [totalRowCount]);

  const handleInput = (index) => {
    styleInputs.current[index].readOnly = true;
  };

  const handleDoubleClick = (index) => {
    const currentValue = styleInputs.current[index];
    currentValue.readOnly = false;
    if (index === curentIndex) {
      currentValue.style.backgroundColor = contextData.inputBgColor;
      currentValue.style.color = contextData.inputFontColor;
      currentValue.style.fontSize = `${contextData.inputFontSize}px`;
    } else {
      currentValue.style.backgroundColor = "#ffffff";
      currentValue.style.color = "black";
      currentValue.style.fontSize = "16px";
      setCurentIndex(index);
    }
  };
  const handleAddMoreRow = () => {
    const rowsToAdd = parseInt(addRow); 
    if (!isNaN(rowsToAdd) && rowsToAdd > 0) {
      setTotalRowCount(totalRowCount+ rowsToAdd);
      setAddRow(0);
    }
  };

  return (
    <div className="sheet">
      <table className="table">
        <thead className="table_Head">
          <tr>
            <th className="tableHead_cell"></th>
            {alphabet.map((alphabet, i) => {
              return (
                <th className="tableHead_cell" key={i}>
                  {alphabet}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table_body">
          {serialNumber.map((value, i) => {
            return (
              <tr key={i}>
                <td className="serial_No">{value}</td>
                {alphabet.map((value, j) => {
                  return (
                    <td className="tableBody_cell" key={j}>
                      <input
                        type="text"
                        ref={(input) =>
                          (styleInputs.current[i * alphabet.length + j] = input)
                        }
                        onClick={() => handleInput(i * alphabet.length + j)}
                        onDoubleClick={() =>
                          handleDoubleClick(i * alphabet.length + j)
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="addMoreRow">
        <button onClick={handleAddMoreRow}>Add</button>
        <input
          type="number"
          placeholder="10"
          value={addRow}
          onChange={(e) => setAddRow(e.target.value)}
          min={0}
        />
        <span>Add more row</span>
      </div>
    </div>
  );
};

export default Sheet;
