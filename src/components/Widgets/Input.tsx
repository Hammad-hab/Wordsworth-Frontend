import {ChangeEventHandler, MouseEventHandler} from "react"
import Link from "next/link"

interface InputBoxProps {
    placeHolder?:string;
    tag:string;
    value?:string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onTagClicked?: MouseEventHandler<HTMLDivElement>
    isRetargeter?:boolean,
    tagLinkURL?:string
}

const InputBox = (props: InputBoxProps) => {
  return (
    <div className="flex flex-row">
        <input type="text" placeholder={props?.placeHolder} className="p-2 rounded-l-md outline-none text-black" value={props.value} onChange={props.onChange}/>
        {
        props.isRetargeter ? <Link href={props.tagLinkURL ?? ""}>
        
          <div 
          className="bg-red-500 border-2 border-red-500 rounded-r-md text-sm p-2 pt-[0.65rem] hover:bg-black font-bold transition-all duration-300"
          onClick={props.onTagClicked}>
              {/* The Label Box */}
              {props.tag}
          </div>
        </Link> : <div 
          className="bg-red-500 border-2 border-red-500 rounded-r-md text-sm p-2 pt-[0.65rem] hover:bg-black font-bold transition-all duration-300"
          onClick={props.onTagClicked}>
              {/* The Label Box */}
              {props.tag}
          </div>
        }
    </div>
  );
};

export default InputBox;