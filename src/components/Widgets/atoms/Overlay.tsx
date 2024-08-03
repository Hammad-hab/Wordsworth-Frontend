
const Overlay = (props: {children?:any, className?:string, style?: any}) => {
    
    return (
        <div className={`absolute w-screen h-screen bg-black flex flex-col z-30 items-center justify-center ${props.className} animate__animated animate__fadeIn animate__faster`} style={props.style}>
          {props.children}
        </div>
    )
}

export default Overlay