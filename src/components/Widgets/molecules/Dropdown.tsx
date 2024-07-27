import { useEffect, useRef } from "react";
import Light from "../Light";
import { createPortal } from "react-dom";

interface DropdownProps {
  children: any;
  show: boolean;
  onBlur?:any
}
const Dropdown = (props: DropdownProps) => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!(container.current instanceof HTMLDivElement)) return
    if (props.show === true) {
      container.current.focus()
      console.log("Focus")
    } else {
      // container.current.blur()
    }
  }, [props.show])
  return (
    <div
      className={`absolute bg-white m-2 text-gray-600 z-50 rounded-sm border border-gray-300 ${
        props.show ? "" : "scale-0"
      } shadow-md select-none outline-none transition-all`}
      ref={container}
      onBlur={props.onBlur}
      >
      <ul>{props.children}</ul>
      </div>
      
    );
  };
  
  export default Dropdown;
  