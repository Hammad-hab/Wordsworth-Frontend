/*
	File contains definations of gradient heading components and higher-order components
	based on GradientHeading that are used through out the application to add modern headings.
*/


interface GradientHeadingProps 
{
	children: any, 
	className?:string,
	id?: any
}



const GradientHeadingBase = (props: GradientHeadingProps) => {
	return (
		<div 
			className={`text-center m-5 -mb-1 mt-2 font-extrabold select-none text-transparent bg-gradient-to-r ${props.className} transition-all`} 
			style={{"WebkitBackgroundClip": 'text'}} id={props.id}> 
				{props.children}
			</div>
	);
};

// 
const GradientHeading = (props: GradientHeadingProps) => {
	/* Extends <GradientHeading/> Providing a smaller heading with blue gradient */
	return <GradientHeadingBase className={`to-[#6d00ea] from-[#00A8E8]  ${!props.className ? "text-6xl" : ""} ${props.className}`} id={props.id}>{props.children}</GradientHeadingBase>
};


const GradientHeadingCold = (props: GradientHeadingProps) => {
	/* Extends <GradientHeading/> Providing a smaller heading with blue gradient */
	return <GradientHeadingBase className={`from-blue-500 to-blue-600 via-blue-400 ${props.className} text-4xl`}>{props.children}</GradientHeadingBase>
};

const GradientHeadingHot = (props: GradientHeadingProps) => {
	/* Extends <GradientHeading/> Providing a smaller heading with a pink and red gradient */
	return <GradientHeadingBase className={`text-4xl from-red-600 to-red-500 via-red-400 ${props.className}`}>{props.children}</GradientHeadingBase>

};

const GradientHeadingSmall = (props: GradientHeadingProps) => {
	/* Extends <GradientHeading/> Providing the smallest heading with a blue and orange gradient */
	return <GradientHeadingBase className={`text-xl from-[#00A8E8] to-[#003459]  ${props.className}`}>{props.children}</GradientHeadingBase>
};

export default GradientHeading;

export {
	GradientHeadingBase,
	GradientHeadingSmall,
	GradientHeadingCold,
	GradientHeadingHot
}
