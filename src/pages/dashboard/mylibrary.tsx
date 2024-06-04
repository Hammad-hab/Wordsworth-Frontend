import { GradientHeadingHot } from "@/components/Widgets/GradientHeading";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import { MdOutlinePostAdd } from "react-icons/md";

const MyLibraryPage = (props: any) => {
  return (
    <DashboardSidebar>
        <h1 className="text-gray-300 text-2xl font-semibold">Your library seems to be empty</h1>
        <MdOutlinePostAdd className="text-gray-300 text-4xl hover:text-gray-400 transition-colors"/>
    </DashboardSidebar>
  );
};

export default MyLibraryPage;