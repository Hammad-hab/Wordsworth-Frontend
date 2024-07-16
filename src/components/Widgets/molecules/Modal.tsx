import withIndependence from "@/components/h-components/withIndependence";
import Overlay from "../atoms/Overlay";

interface ModalProps {
  children: any;
  title: string;
  show?: boolean;
}
const Modal = (props: ModalProps) => {
  return (
    <>
      {props.show ? (
        <Overlay className="fixed top-0" style={{background: "#07070754"}}>
          <div className="bg-zinc-300 shadow-xl rounded-md">
            <div className="w-full p-2 bg-zinc-500 font-semibold text-zinc-400">
              {props.title}
            </div>
            <div className="p-10">{props.children}</div>
          </div>
        </Overlay>
      ) : (
        ""
      )}
    </>
  );
};

export default withIndependence(Modal);
