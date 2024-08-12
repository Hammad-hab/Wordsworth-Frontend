import GradientHeading, {
  GradientHeadingSmall,
} from "@/components/Widgets/GradientHeading";
import BorderButton, {
  ButtonBorder,
  ButtonBorderBlue,
  Partition,
} from "@/components/Widgets/atoms/StandardBorderButton";
import InputBox from "@/components/Widgets/Input";
import { SiGooglegemini } from "react-icons/si";
import { ImLibrary } from "react-icons/im";
import Light, { AnimatedLight } from "@/components/Widgets/Light";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiPaintRoller } from "react-icons/gi";
import AlphaCard from "@/components/Widgets/molecules/AlphaCard";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { LampContainer } from "@/components/ui/lamp";

export default function Home() {
  const [retargetedEmail, setRetargedEmail] = useState("");
  const navigator = useRouter();

  return (
    <div className="w-full h-full flex flex-col bg-black">
      <header className="flex flex-row z-10 shadow-md shadow-[#030303]">
        <div className="w-1/2"></div>
        <div className="w-1/2 flex flex-row-reverse gap-5">
          <Link href={"/account/create"}>
            <ButtonBorder theme="b">Register</ButtonBorder>
          </Link>
          <Link href={"/account/login"}>
            <BorderButton theme="b">Login</BorderButton>
          </Link>
        </div>
      </header>

      <div
        id="section-main"
        className={`bg-image-net bg-cover bg-center bg-opacity-50 mb-10 p-5 mt-20 sm:mt-0`}
      >
        <div className="flex flex-row flex-grow">
          <AnimatedLight
            color="#00ffcc"
            blurRadius={300}
            className="w-[200px] h-[200px] absolute"
          />
          <AnimatedLight
            color="#00A8E8"
            blurRadius={200}
            className="w-[300px] h-[200px] self-end"
          />
        </div>
        <GradientHeading className="text-4xl sm:text-6xl">Welcome to WordsWorth</GradientHeading>
        <GradientHeadingSmall className="text-sm  md:text-xl">
          Your AI-Powered Reading Assistant
        </GradientHeadingSmall>
        <div className="text-white mt-20 flex flex-col">
          <div className="flex flex-row items-center justify-center w-full pb-10">
            {/* <Light color="#00ffff" blurRadius={30} className="w-[100px] h-[25px] absolute ml-6 sa"/> */}
            {/* <InputBox
              tag="Let's Read!"
              placeHolder="Enter Email"
              value={retargetedEmail}
              onChange={(e) => setRetargedEmail(e.target.value)}
              isRetargeter={true}
              tagLinkURL={"/account/create?usemail=" + retargetedEmail} */}
            {/* /> */}
            <Link href={"/account/create"}>
              <ButtonBorder theme="b" className="w-fit text-[10px] md:text-[15px] md:btn-shadow md:btn-xl">
                Create Account
              </ButtonBorder>
            </Link>
            <Partition />
            <BorderButton theme="b" className="w-fit text-[10px] md:text-[15px] md:btn-shadow md:btn-xl">
              Get Started
            </BorderButton>
          </div>
        </div>
      </div>

      <div className="text-white w-full p-2 pt-4 grid grid-cols-1 sm:grid-cols-3 mt-10 mb-10 gap-5">
        <p className="dm-sans text-xl sm:text-3xl font-bold text-center text-glow">
          <CountUp end={230} duration={2} />
          K+
          <small className="block text-xl sm:text-3xl"> Books</small>
        </p>
        <p className="dm-sans text-xl sm:text-3xl font-bold text-center text-glow">
          <CountUp end={400} duration={3} />K
          <small className="block text-xl sm:text-3xl"> Daily Users</small>
        </p>
        <p className="dm-sans text-xl sm:text-3xl font-bold text-center text-glow">
          <CountUp end={300} duration={3.5} />K
          <small className="block text-xl sm:text-3xl"> Records</small>
        </p>
      </div>

      <div
        id="section-powered"
        className="text-white dm-sans flex flex-row items-center justify-center mt-24 lg:mt-10 section_divider_bottom lg:rounded-t-full section_divider_top w-full"
        style={{ background: "rgb(7,7,7)" }}
      >
        <div className="flex flex-col mt-10 w-full lg:w-1/3 p-10 lg:p-0 lg:pt-10">
          <Light
            color="#00ffff"
            blurRadius={150}
            className="w-[200px] fixed h-[100px] ml-96 mt-20"
          />

          <AlphaCard
            icon={<SiGooglegemini className="text-white text-2xl" />}
            headingText="Powered By Gemini"
            iconBg="#F44336"
          >
            <Light
              color="#00A8E8"
              blurRadius={150}
              className="w-[250px] h-[150px] mr-96 absolute"
            />
            <p className="text-gray-200 ">
              Wordsworth is an AI powered book library where you can find the
              best books for you that are worth your time. Not only will your
              queries be more accurate, they will align with your needs are
              desires! Let WordsWorth find the right books for you!
            </p>
          </AlphaCard>

          <AlphaCard
            icon={<ImLibrary className="text-white text-2xl" />}
            headingText="Your Personal Library"
            iconBg="#4CAF50"
          >
            <Light
              color="#00ffcc"
              blurRadius={130}
              className="w-[100px] h-[100px] ml-96 absolute"
            />
            <p className="text-gray-200">
              Upload your favorite books and novels to your very own personal
              book library online! This way you can get on spot recommendations
              and reading help from wordsworth, your friendly AI companion. Just
              underline the stuff you like and have wordsworth give you more
              accurate responses!
            </p>
          </AlphaCard>

          <AlphaCard
            icon={<GiPaintRoller className="text-white text-2xl" />}
            headingText="Customisability"
            iconBg="#E91E63"
          >
            <Light
              color="#00A8E8"
              blurRadius={200}
              className="w-[300px] h-[100px] absolute ml-24"
            />
            <p className="text-gray-200 mb-10">
              Customisability is what makes something really fun. Wordsworth
              allows you to customise and create a perfect comfortable reading
              enviornment for you! This includes reader styles, dashboard
              preferences, icons and even layout. Make wordsworth your own!
            </p>
          </AlphaCard>
        </div>
      </div>

      <div
        id="section-info"
        className="flex flex-col justify-end items-start mt-0 section_divider_bottom bg-[#00171f7e] dm-sans net_rotating section_divider_top_invert"
      >
        <div className="w-full flex flex-col lg:flex-row mt-[100px] items-center justify-center">
          <div id="content" className="w-full lg:w-1/3 mt-10">
            <GradientHeading className="text-2xl md:text-4xl from-[#003459] to-[#00A8E8]">
              Find words{" "}
              <b className="border-b-4 border-double uppercase">worth</b> your
              time
            </GradientHeading>
            <p className="text-white text-md sm:text-lg  m-10 encode-sans-expanded-regular p-2">
              Like Sir Francis Bacon said{" "}
              {
                '"Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly"'
              }
              . Wordsoworth searches for books that are exactly aligning with
              your interests and are WORTH chewing and digesting thoroughly,
              life is too breif to be reading books not worth your time.
            </p>
          </div>
          <div id="image" className="w-full md:w-1/3  text-center items-center">
            <Light
              color="cyan"
              blurRadius={100}
              className="w-[150px] h-[150px] absolute mt-[200px] ml-[200px]"
            />
            <Image
              src="/Images/svg/homework.svg"
              alt="Sample"
              width={600}
              height={600}
              className="block m-auto"
            />
          </div>
        </div>
      </div>

      <div
        id="section-predictions"
        className="flex flex-col justify-end items-start mt-0 bg-[#00171f7e] dm-sans section_divider_bottom_invert"
      >
        <div className="w-full flex flex-col lg:flex-row mt-[100px] items-center justify-center p-5 mb-10 pt-16">
          <div id="image" className="w-full md:w-1/3 text-center items-center mb-10">
            <Light
              color="pink"
              blurRadius={100}
              className="w-[200px] h-[200px] absolute ml-[200px] superglow_orb z-50"
            />

            <Image
              src="/Images/haze-magic-ball.png"
              alt="Sample"
              width={300}
              height={300}
              className="block m-auto"
            />
          </div>
          <div id="content" className="w-full lg:w-1/3 mt-10">
            <GradientHeading className="text-2xl md:text-4xl from-[#003459] to-[#00A8E8]  bg-gradient-to-r">
              Don{"'"}t think, ask it!
            </GradientHeading>
            <p className="text-white text-md sm:text-lg m-10 encode-sans-expanded-regular p-2">
              Having trouble reading something? Maybe <b>Charles Dickens</b> got
              really picky with his description? Wordsworth can help you
              understand things like a friendly teacher who{"'"}s always by your
              side. Make your reading work more productive!
            </p>
          </div>
        </div>
      </div>
      
      <LampContainer className="hidden sm:flex">
        <h1 className="text-white text-4xl md:text-7xl">Join the Journey, today</h1>
        <Link href={"/account/create"}>
          <ButtonBorderBlue className="mt-10">Join Wordsworth</ButtonBorderBlue>
        </Link>
      </LampContainer>

      <footer className="p-5 pl-20 pt-6 bg-gradient-to-t bg-gray-900 hidden md:block">
        <p className="flex flex-row items-center gap-5 text-lg text-white">
          <span>
            <Image
              src={"/Images/logo.jpeg"}
              width={50}
              height={50}
              alt="logo"
              className="rounded-full inline mr-5"
            />
            Wordsworth
          </span>
          <span className="text-sm mr-2 flex flex-row gap-5 font-medium">
            <b>For Writers</b>
            <b>Advertisment</b>
            <b>Leveling System</b>
          </span>
        </p>
        <div className="text-gray-600 flex-row items-center text-sm gap-5 mt-8">
          <p className="w-1/2 hidden md:block">
            <span className="ml-6">&#169; 2024 Wordsworth</span>
            <span className="ml-6">Terms</span>
            <span className="ml-6">About</span>
            <span className="ml-6">Contact</span>
          </p>
          <p className="w-1/2 text-right hidden md:block">
            <span className="ml-6">Jobs</span>
            <span className="ml-6">Reasources</span>
            <span className="ml-6">Documentation</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
