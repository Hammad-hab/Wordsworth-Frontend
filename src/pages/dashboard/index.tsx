"use client"
import GradientHeading from "@/components/Widgets/GradientHeading";
import { useUserInformation } from "@/components/global/userStandardContext";
import withAccountPrevention from "@/components/h-components/withAccountPrevention";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import dynamic from 'next/dynamic'
import { title } from "process";

const JoyRideNoSSR = dynamic(
  () => import('react-joyride'),
  { ssr: false }
)

const DashboardMain = (props: any) => {
  const usrdata = useUserInformation();
  const [shouldShowTutorial, setShowTutorial] = useState<any>(null)
  const steps = [
    {
      target: ".hd",
      title:"Warm welcome",
      content: "Welcome to wordsworth! This is your tour of the website!",
      disableBeacon: true 
    },
    {
      target: ".sidebar",
      title:"Introduction to sidebar",
      content: "This is the sidebar, you'll find most of the useful stuff here!",
      disableBeacon: true,

    },
    {
      target: "#LibraryLink",
      title: "Books and Libraries",
      content: "This is your library, here you can upload your books and have AI assistance while you read them!",
      
      disableBeacon: true 
    },
    {
      target: "#YourChats",
      title:"Conversations",
      content: "Here, you can create a new conversation and talk with wordsworth with almost anything related to books!",
      
      disableBeacon: true 
    },
    {
      target: "#LevelIndigator",
      title: "Levels and Ranks",
      disableBeacon: true,
      content: "Reading is like a journey, and wordsworth lets you keep track of it! See this progress bar here? It tracks your level and XP, the higher the level, the better reader you are! XP's are awarded as you progress as a reader."
    },
    {
      target: "body",
      title: "Goodbye",
      disableBeacon: true,
      content: "Well, that's all folks! You can find more information at the documentation!"
    }
  ];
  useEffect(() => {
    setShowTutorial(!Boolean(localStorage.getItem("hasdonetutorial")))
    localStorage.setItem("hasdonetutorial", 'true')
  },[])
  // useEffect(() => {
  //   window.addEventListener('mouseup', function(event) {
  //     // Get the selected text
  //     const selectedText = window.getSelection()?.toString();

  //     // Check if any text was selected
  //     if (selectedText?.length > 0) {
  //         console.log("Selected text:", selectedText);

  //         // Optionally, you can get the cursor position
  //         const posX = event.clientX;
  //         const posY = event.clientY;

  //         // Perform actions with the selected text or cursor position
  //         // For example, show a popup or modify the text
  //     }
  // }, false);
  // }, [])

  return (
    <>
      <DashboardSidebar>
        <GradientHeading className="text-4xl mt-5 border-b-2 border-double border-gray-600 p-2 mb-2 hd">
          Welcome to WordsWorth, {usrdata?.UserInfo?.displayName}
        </GradientHeading>
        <p className="text-lg font-bold">Let{"'"}s get started by:</p>
        <div className="w-1/2 p-2 m-2 flex flex-col items-center">
          <ul className="list-disc ml-10">
            <li>Customising your dashboard</li>
            <li>Uploading Books</li>
            <li>Finding your next novel</li>
            <li>Understanding your favorite books</li>
            <li>Chating with our AI bindings</li>
          </ul>
        </div>
      </DashboardSidebar>
      {shouldShowTutorial ? <JoyRideNoSSR steps={steps} run locale={{close: "Next"}}/>: ""}
    </>
  );
};

export default withAccountPrevention(DashboardMain);
