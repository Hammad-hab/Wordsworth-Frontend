import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen"
import GradientHeading from "@/components/Widgets/GradientHeading";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

interface AccountFormsProps {
  isLoading:boolean,
  Error:string,
  Heading:string,
  children:any
}

const AccountForms = (props: AccountFormsProps) => {
  return (
  <div className="flex flex-row w-screen h-screen bg-image-account bg-contain bg-right">      
		<LoadingScreen isLoading={props.isLoading}/>

		<div className="lg:w-1/3 sm:w-full h-full backdrop-blur-lg p-10 left-0" style={{backgroundColor: "rgba(0,0,0, 0.75)"}}>
			<Link href={"/"}>
				<IoIosArrowRoundBack className="z-50 text-4xl text-white hover:translate-x-1 transition-transform cursor-pointer"/>
			</Link>
			<h1 className="text-3xl font-bold text-white text-center mt-20 mb-10 select-none">{props.Heading}</h1>
			{/* Acutal Form. i.e where the register fields are! */}
			<div>
				
				<span className={`text-red-500 ${!props.Error ? "hidden" : "h"} text-sm mb-2`}>: {props.Error}</span>
				<hr className="opacity-50 mt-5"/>
				<div className="flex flex-col items-center justify-center">
				
				{props.children}

				</div>
			</div>
		</div>
		<div className="flex-grow h-full bg-right flex flex-col items-center justify-center select-none">
				<GradientHeading>WordsWorth</GradientHeading>
				<GradientHeading className="text-xl">Best books for you</GradientHeading>
		</div>
	</div>
  );
};

export default AccountForms;