import withIndependence from "@/components/h-components/withIndependence";
import Overlay from "../atoms/Overlay";

interface ModalProps {
  children: any;
  title: string;
  show?: boolean;
  subtitle?:string;
  caption?:string;
  content?:string;
  
}
const Modal = (props: ModalProps) => {
  return (
    <>
      {props.show ? (
        <Overlay className="fixed top-0" style={{background: "#07070754"}}>
          <div className="m-auto bg-white w-fit rounded-md shadow-md select-none">
            <div className="p-2">
              <div className="flex flex-col justify-center items-center p-2" style={{zIndex: "999999 !important"}}>
                <h1 className="text-center text-2xl">{props.title}</h1>
                <h2 className="text-center text-lg">{props.subtitle}</h2>
                <small>
                  <i>{props.caption}</i>
                </small>

              </div>
              <small className="block m-2">{props.content}</small>
            </div>
            <div className="flex flex-col text-center text-sm">
              {props.children}
            </div>
          </div>
        </Overlay>
      ) : (
        ""
      )}
    </>
  );
};

export default withIndependence(Modal);
