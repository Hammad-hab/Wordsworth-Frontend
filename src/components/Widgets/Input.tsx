import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Link from "next/link";

interface InputBoxProps {
  placeHolder?: string;
  tag: string | any;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onTagClicked?: MouseEventHandler<HTMLDivElement>;
  isRetargeter?: boolean;
  tagLinkURL?: string;
  className?: string;
  theme?: "Light" | "Dark";
  autoClickDisable?: boolean;
  minLength?: number;
  maxLength?: number;
  containerClassName?:string;
  onEnter?: any,
  ref?: any;
}

const InputBox = (props: InputBoxProps) => {
  const [isDisabled, setDisabled] = useState(true);
  const maxLength = props.maxLength ?? 10;
  const minLength = props.minLength ?? 0;
  const handleClickEvent = (e: any) => {
    if (!props.onTagClicked) return;
    if (!isDisabled && props.autoClickDisable) props.onTagClicked(e);
  };

  const changeEvent: typeof props.onChange = (e) => {
    if (
      props.autoClickDisable &&
      e.target.value.length <= maxLength &&
      e.target.value.length > minLength
    )
      setDisabled(false);
    else setDisabled(true);

    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`flex flex-row ${props.containerClassName}`}>
      <input
        type="text"
        placeholder={props?.placeHolder}
        className={`p-2 rounded-l-md outline-none text-black ${props.className}`}
        value={props.value}
        onChange={changeEvent}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.onEnter()
        }}
      />
      {props.isRetargeter ? (
        <Link href={props.tagLinkURL ?? ""}>
          <div
            className={`rounded-r-md text-sm p-2 pt-[0.65rem] ${
              props.theme === "Light" ? "hover:bg-white" : "hover:bg-black"
            } font-bold transition-all duration-300 cursor-pointer ${
              isDisabled && props.autoClickDisable
                ? "bg-[#00A8E8] border-2 border-[#00A8E8]"
                : "bg-[#4795b4] border-2 border-[#4593b2]"
            }`}
            onClick={handleClickEvent}
          >
            {/* The Label Box */}
            {props.tag}
          </div>
        </Link>
      ) : (
        <div
          className={`rounded-r-md text-sm p-2 pt-[0.65rem] ${
            props.theme === "Light" ? "hover:bg-white" : "hover:bg-black"
          } font-bold transition-all duration-300 cursor-pointer ${
            isDisabled && props.autoClickDisable
              ? "bg-[#00A8E8] border-2 border-[#00A8E8]"
              : "bg-[#4795b4] border-2 border-[#4593b2]"
          }`}
          onClick={handleClickEvent}
        >
          {/* The Label Box */}
          {props.tag}
        </div>
      )}
    </div>
  );
};

export default InputBox;
