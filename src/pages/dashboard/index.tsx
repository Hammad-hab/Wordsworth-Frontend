import GradientHeading from "@/components/Widgets/GradientHeading";
import { UserContext } from "@/components/global/userStandardContext";
import withAccountPrevention from "@/components/h-components/withAccountPrevention"
import { useContext } from "react";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";

const DashboardMain = (props: any) => {
  const user = useContext(UserContext) 
  return (
      <DashboardSidebar>
          <GradientHeading className="text-4xl mt-5 border-b-2 border-double border-gray-600 p-2 mb-2">Welcome to WordsWorth, {user?.UserInfo?.displayName}</GradientHeading>
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
  );
};

export default withAccountPrevention(DashboardMain);