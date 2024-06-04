import { ButtonHTMLAttributes, MouseEventHandler, ReactElement } from "react";

interface BorderButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: any;
  className?: string;
  retargetRef?:any
}

const BorderButton = (props: BorderButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`border-red-500 border-2 rounded white p-2 font-bold hover:bg-red-500 transition-all duration-300 ${
        props.disabled ? "hover:bg-red-100" : ""
      } ${props.className}`}
      onClick={!props.disabled ? props.onClick : undefined}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      ref={props.retargetRef}
    >
      {props.children}
    </button>
  );
};

const ButtonBorder = (props: BorderButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`bg-red-500 border-2 border-red-500 rounded white p-2 font-bold hover:bg-red-400 transition-all duration-300 ${
        props.disabled ? "bg-red-100" : ""
      } ${props.className}`}
      onClick={!props.disabled ? props.onClick : undefined}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      ref={props.retargetRef}
    >
      {props.children}
    </button>
  );
};

export default BorderButton;

const ButtonBorderBlue = (props: BorderButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`border-2 border-blue-500 rounded white p-2 font-bold hover:bg-blue-400 transition-all duration-300 ${
        props.disabled
          ? "bg-blue-100 text-blue-400 hover:bg-blue-200 border-blue-100"
          : "bg-blue-500 "
      } ${props.className}`}
      onClick={!props.disabled ? props.onClick : undefined}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  );
};

interface PartitionProps {}

const Partition = (props: PartitionProps) => {
  return (
    <div className="border-l-2 ml-5 mr-5 border-stone-800 p-5 h-full pl-0 pr-0"></div>
  );
};


export { ButtonBorder, Partition, ButtonBorderBlue };
