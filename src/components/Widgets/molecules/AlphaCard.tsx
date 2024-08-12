import {GradientHeadingBase, GradientHeadingCold} from "@/components/Widgets/GradientHeading";
import AlphaCardTagAtom from "../atoms/AlphaCardTag";

interface AlphaCardProps {
    icon: any,
    headingText:string,
    children?:any,
	iconBg: string
}

const AlphaCard = (props: AlphaCardProps) => {
	return (
		<>
		    
			<AlphaCardTagAtom background={props.iconBg} content={props.icon}/>
			<GradientHeadingBase className={`from-blue-500 to-blue-600 via-blue-400 text-2xl sm:text-4xl`}>{props.headingText}</GradientHeadingBase>
			<div className="mt-2 p-5 encode-sans-expanded-regular clip-overflow w-full text-md sm:text-lg">
                {props.children}
			</div>
		</>
	);
};

export default AlphaCard;
