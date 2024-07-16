import ReactLoading from 'react-loading';
import Overlay from '../atoms/Overlay';
import Light from '../Light';

const LoadingScreen = (props: {isLoading?:boolean}) => {
    if (!props.isLoading) {
        return <></>
    }
    return (
        <Overlay>
          <ReactLoading color="white" type="spinningBubbles"/>
          <Light color='purple' blurRadius={150} className='fixed top-0 w-[100px] h-[200px] left-0'/>
          <Light color='cyan' blurRadius={210} className='fixed bottom-0 w-[100px] h-[200px] right-0'/>
          <p className="text-white mt-10">Loading...</p>
        </Overlay>
    )
}

export default LoadingScreen