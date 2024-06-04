import {GradientHeadingCold} from "@/components/Widgets/GradientHeading";
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
			<GradientHeadingCold className={"flex w-fit text-2xl"}>{props.headingText}</GradientHeadingCold>
			<div className="mt-2 p-5 encode-sans-expanded-regular w-full text-lg">
                {props.children}
			</div>
		</>
	);
};

export default AlphaCard;
