import { useEffect, useState, useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrRedo } from "react-icons/gr";
import { BiUndo } from "react-icons/bi";
import { FaPrint } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoMdColorFill } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaPaintRoller } from "react-icons/fa";
import { SketchPicker } from "react-color";
import { ImTextColor } from "react-icons/im";
import { inputContext } from "../context/sheetContext.jsx";
import "../Style/header.css";

const Header = () => {
  const [font, setFont] = useState([]);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [BgColorPicker, setBgColorPicker] = useState(false);
  const [textColorPicker, setTextColorPicker] = useState(false);

  const inputContextData = useContext(inputContext);


  const handleColor = () => {
    setBgColorPicker(!BgColorPicker);
  };
  const textColorhandler = () => {
    setTextColorPicker(!textColorPicker);
  };
  useEffect(() => {
    const fetchFont = async () => {
      const response = await fetch(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyADLHJ_x0OLEN-P4SSQIHkT5uRVpdOC9hQ"
      );
      const data = await response.json();
      const fonts = data.items.map((item) => item.family);
      setFont(fonts);
    };
    fetchFont();
  }, []);

  useEffect(() => {
    inputContextData.setInputFontSize(fontSize);
    inputContextData.setInputFontColor(fontColor);
    inputContextData.setInputBgColor(backgroundColor);
    inputContextData.setSelectFontFamily(fontFamily);
  }, [fontSize, fontColor, backgroundColor, fontFamily]);

  const handleIncrement = () => {
    setFontSize(fontSize + 1);
  };

  const handleDecrement = () => {
    setFontSize(fontSize - 1);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
    setFontColor(color.hex);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
    setBackgroundColor(color.hex);
  };

  return (
    <div className="header">
      <FaMagnifyingGlass />
      <BiUndo />
      <GrRedo />
      <FaPrint />
      <FaPaintRoller />
      <div className="selectFont">
        <span>Font</span>
        <select
          className="selectFont"
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
          }}
        >
          {font &&
            font.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <div className="selectFont_Size">
        <button onClick={handleDecrement}>
          <FaMinus />
        </button>
        <input
          type="Number"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
      <div className="fontStyle">
        <button>
          <strong>B</strong>
        </button>
        <button>
          <strong>I</strong>
        </button>
      </div>
      <div className="fontColor">
        <button onClick={textColorhandler}>
          <ImTextColor />
        </button>
        {textColorPicker && (
          <SketchPicker
            value={textColor}
            color={textColor}
            onChange={handleTextColorChange}
          />
        )}
        <div
          className="colorBox"
          style={{
            backgroundColor: textColor,
          }}
        ></div>
      </div>
      <div className="colorPicker">
        <button onClick={handleColor}>
          <IoMdColorFill />
        </button>

        {BgColorPicker && (
          <SketchPicker
            color={bgColor}
            value={bgColor}
            onChange={handleBgColorChange}
          />
        )}
        <div
          className="colorBox"
          style={{
            backgroundColor: backgroundColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Header;
