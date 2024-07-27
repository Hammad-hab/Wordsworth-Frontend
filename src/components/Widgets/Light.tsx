
interface LightProps
{
    color: string,
    width?: string,
    height?: string,
    className?: string,
    blurRadius: Number,
    children?: any
}

const Light = (props: LightProps) => {
  return (
    <div className={`${props.className} z-10 overflow-hidden`} id="light" style={{
        backgroundColor: props.color,
        filter: `blur(${props.blurRadius}px)`,
    }}>
        {props.children}
    </div>
  );
};

const AnimatedLight = (props: LightProps) => {
    return <Light {...props} className={`${props.className} fadeIn`}/>
}

export default Light;
export {
  AnimatedLight
}