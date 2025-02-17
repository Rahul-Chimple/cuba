import { PARENTHEADERLIST } from "../../common/constants";
import DropDown from "../DropDown";
import "./RectangularOutlineDropDown.css";
const RectangularOutlineDropDown: React.FC<{
  optionList:    {
    id: string;
    displayName: string;
  }[];
  currentValue: string | undefined;
  onValueChange;
  width: string;
  placeholder:string| undefined
  // buttonWidth: number;
  // buttonHeight: number;
  // iconSrc: string;
  // // rectangularIcon: any;
  // name: string;
  // isButtonEnable: boolean;
  // onHeaderIconClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ optionList, currentValue, onValueChange, width,placeholder }) => {
  return (
    <div
      id="rectangular-outline-dropdown"
      style={{
        width: width,
      }}
    >
      <DropDown 
        optionList={optionList}
        currentValue={currentValue}
        width={width}
        placeholder={placeholder}
        onValueChange={onValueChange}
      />
    </div>
    // <div
    //   id="rectangular-icon-button"
    //   onClick={onHeaderIconClick}
    //   style={{
    //     width: buttonWidth + "vw",
    //     height: buttonHeight + "vh",
    //     opacity: isButtonEnable ? "1" : "0.5",
    //   }}
    // >
    //   <p>{name}</p>
    //   <img
    //     id="rectangular-icon-button-img"
    //     style={{
    //       width: "auto",
    //       height: buttonHeight - 2 + "vh",
    //     }}
    //     alt={iconSrc}
    //     src={iconSrc}
    //   />
    //   {/* {rectangularIcon} */}
    // </div>
  );
};
export default RectangularOutlineDropDown;
