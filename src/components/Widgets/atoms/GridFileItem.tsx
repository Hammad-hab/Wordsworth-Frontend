import { MegaFile } from "@/components/global/interfaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GridFileItemProps {
  key: any;
  file: MegaFile;
  onSelect: (fl: MegaFile) => void;
  onUnSelect: (fl: MegaFile) => void;
  onDblClick: (fl: MegaFile) => void;
}
const GridFileItem = (props: GridFileItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!(inputRef.current instanceof HTMLInputElement)) return;
    if (isSelected) inputRef.current.focus();
  }, [isSelected, inputRef]);
  return (
    <div
      className={`rounded-md p-5 flex flex-col border-2 border-zinc-800 select-none ${
        isSelected ? "bg-zinc-500 border-dashed border-zinc-800" : ""
      }`}
      onClick={() => {
        setIsSelected(!isSelected);
        if (isSelected) {
          props.onUnSelect(props.file);
		  setPreview(false)
        } else {
          props.onSelect(props.file);
        }
      }}
      onDoubleClick={() => {
        setIsSelected(true);
        props.onDblClick(props.file);
      }}
    >
      <input
        ref={inputRef}
        className="text-black opacity-0 absolute"
        onChange={(e) => {
          if (e.target.value === " " && !preview) {
            setPreview(true);
            if (inputRef.current) inputRef.current.value = "";
            console.log("TRIGGER PREVIEW");
          } else {
            setPreview(false);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
        maxLength={1}
      />
      <Image src={"/pdf.png"} width={100} height={100} alt="icon" />
      <p className="text-sm">
        {props.file.name.length >= 10
          ? props.file.name.slice(0, 10) + "..."
          : props.file.name}
      </p>
        <iframe
          src={`/dashboard/readfile?file=${props.file.name}&embed=true&scale=0.5`}
		  width={500}
		  height={500}
		  className={`bg-gray-200 shadow-md absolute rounded-md ${!preview ? "hidden" : "animate__animated animate__zoomIn animate__faster z-20 "}`}
        ></iframe>
    </div>
  );
};

export default GridFileItem;
 