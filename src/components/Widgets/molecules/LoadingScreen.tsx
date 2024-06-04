import ReactLoading from 'react-loading';

const LoadingScreen = (props: {isLoading?:boolean}) => {
    if (!props.isLoading) {
        return <></>
    }
    return (
        <div className="absolute w-screen h-screen bg-black flex flex-col z-30 items-center justify-center">
          <ReactLoading color="white" type="spinningBubbles"/>
          <p className="text-white mt-10">Loading...</p>
        </div>
    )
}

export default LoadingScreen