interface TagProps {
    text: string | number,
    className?: string
}
const __BaseTag = (props: TagProps) => {
  return (
    <div className={`${props.className}`}>
        {props.text}
    </div>
  );
};


const GoodTag = (props:TagProps) => {
    return (
        <__BaseTag text={props.text} className="p-1 text-green-600 bg-green-300 text-sm inline rounded-lg border-green-500 h-fit px-2"/>
    )
}

const BadTag = (props:TagProps) => {
    return (
        <__BaseTag text={props.text} className="p-1 text-red-600 bg-red-300 text-sm inline rounded-lg border-red-500 h-fit px-2"/>
    )
}




export {
    GoodTag,
    BadTag
}