import GradientHeading, {GradientHeadingSmall, GradientHeadingCold} from "@/components/Widgets/GradientHeading";
import BorderButton, { Partition } from "@/components/Widgets/atoms/StandardBorderButton";
import InputBox from "@/components/Widgets/Input";
import { SiGooglegemini } from "react-icons/si";
import { ImLibrary } from "react-icons/im"
import Light, { AnimatedLight } from "@/components/Widgets/Light";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiPaintRoller } from "react-icons/gi";
import AlphaCard from "@/components/Widgets/molecules/AlphaCard";


export default function Home() {
	const [retargetedEmail, setRetargedEmail] = useState("")
	const navigator = useRouter()

	return (
		<div className="w-full h-full flex flex-col bg-black">
			<div id="section-main" className={`bg-image-net bg-cover bg-center bg-opacity-50 mb-10 p-5`}>
				<div className="flex flex-row flex-grow">
					<AnimatedLight color="#FF7043" blurRadius={300} className="w-[200px] h-[200px] absolute"/>
					<AnimatedLight color="#E65100" blurRadius={300} className="w-[200px] h-[200px] self-end"/>
				</div>
				<GradientHeading>Welcome to WordsWorth</GradientHeading>
				<GradientHeadingSmall>Your AI-Powered Reading Assistant</GradientHeadingSmall>

				<div className="text-white mt-20 flex flex-col">
					<div className="flex flex-row items-center justify-center w-11/12">
						<InputBox
							tag="Let's Read!" 
							placeHolder="Enter Email" 
							value={retargetedEmail} 
							onChange={(e) => setRetargedEmail(e.target.value)}
							isRetargeter={true}
							tagLinkURL={"/account/create?usemail="+retargetedEmail}
						/>
        				<Partition/>

						<BorderButton>Get Started</BorderButton>
					</div>
				</div>
			</div>
			
			<div id="section-powered" className="text-white flex flex-row items-center justify-center mt-10 rounded-t-full mb-[100px]" style={{background: "rgb(7,7,7)"}}>
				<div className="flex flex-col mt-10 w-1/3">
					<Light color="#E65100" blurRadius={200} className="w-[200px] h-[100px] ml-96"/>

					<AlphaCard icon={<SiGooglegemini className="text-white text-2xl"/>} headingText="Powered By Gemini" iconBg="#F44336">
						<Light color="#ff66cc" blurRadius={150} className="w-[200px] h-[100px] mr-96 absolute"/>
						<p className="text-gray-200">
							orem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae maiores
							doloremque ad tempora! Debitis nam quas, aliquid molestias ratione tempora 
							aut facilis excepturi beatae in autem officiis reiciendis ducimus?
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae maiores
							aut facilis excepturi beatae in autem officiis reiciendis ducimus?
						</p>
					</AlphaCard>

					<AlphaCard icon={<ImLibrary className="text-white text-2xl"/>} headingText="Your Personal Library" iconBg="#4CAF50">
						<Light color="#cc0099" blurRadius={140} className="w-[200px] h-[100px] ml-96 absolute"/>
						<p className="text-gray-200">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae maiores
							doloremque ad tempora! Debitis nam quas, aliquid molestias ratione tempora 
							aut facilis excepturi beatae in autem officiis reiciendis ducimus?
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae maiores
						</p>
					</AlphaCard>

					<AlphaCard icon={<GiPaintRoller className="text-white text-2xl"/>} headingText="Customisability" iconBg="#E91E63">
						<Light color="#ff00ff" blurRadius={200} className="w-[200px] h-[100px] absolute ml-24"/>
						<p className="text-gray-200">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae maiores
							doloremque ad tempora! Debitis nam quas, aliquid molestias ratione tempora 
							aut facilis excepturi beatae in autem officiis reiciendis ducimus?
						</p>
					</AlphaCard>
          		</div>
			</div>
		  <div id="section-info" className="text-white flex flex-row items-center justify-center mt-10">
			Hia
			
		  </div>
		</div>
	);
}