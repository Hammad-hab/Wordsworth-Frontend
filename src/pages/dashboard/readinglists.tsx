import {
  useUserAccountInformation,
  useUserInformation,
} from "@/components/global/userStandardContext";
import ReadingList from "@/components/Widgets/molecules/ReadingList";
import { useEffect, useState } from "react";
import Modal from "@/components/Widgets/molecules/Modal";
import {
  getUsrInformation,
  updateUsrInformation,
} from "@/components/global/firestore";
import { arrayUnion } from "firebase/firestore";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useRouter } from "next/router";
import { ButtonBorderBlue } from "@/components/Widgets/atoms/StandardBorderButton";

interface ReadingListManagerProps {}
const ReadingListManager = (props: ReadingListManagerProps) => {
  const [readingLists, setReadingLists] = useState<any>([]);
  const [newReadingList, setReadingName] = useState<string>("New List");
  const [newReadingBook, setBookName] = useState<string>("Sherlock Holmes");
  const [newReadingListDesc, setReadingDesc] = useState<string>(
    "No Description"
  );
  const createReadingList = () => {
    userInfo?.UserInfo?.ReadingLists.push({
      name: newReadingList,
      titles: [],
      description: newReadingListDesc,
    });
    updateUsrInformation(userAccount?.uid!, {
      ReadingLists: userInfo?.UserInfo?.ReadingLists,
    });
    userInfo?.setUserInfo(userInfo.UserInfo);
    setReadingLists([...userInfo?.UserInfo?.ReadingLists!]);
    clearObjectLocalStorage();
    setShowCreate(false);
    setReadingName("New List");
  }
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showInsert, setShowInsert] = useState<any[]>([false, -1]);
  const userInfo = useUserInformation();
  const userAccount = useUserAccountInformation();
  const navigator = useRouter()

  useEffect(() => {
    setReadingLists([...(userInfo?.UserInfo?.ReadingLists ?? [])]);
  }, [userInfo]);
  return (
    <DashboardSidebar>
      <ContextMenu>
        <ContextMenuTrigger>
          {!readingLists.length ? (
            <span className="text-gray-500 w-full text-center h-full">
              You have no reading lists. <em className="text-blue-500 hover:text-blue-400 hover:underline cursor-pointer" onClick={() => setShowCreate(true)}>Create</em> one
            </span>
          ) : (
            <div className="p-5  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full sm:h-1/2 w-full">
              {readingLists.map((value: any, k: number) => (
                <ReadingList
                  key={k}
                  index={k}
                  name={value.name}
                  titles={value.titles}
                  description={value.description}
                  onAdd={(reloader) => setShowInsert([reloader, k])}
                  onDel={async () => {
                    await updateUsrInformation(userAccount?.uid!, {
                      ReadingLists: userInfo?.UserInfo?.ReadingLists.filter(
                        (vl) => vl.name.trim() !== value.name.trim()
                      ),
                    });
                    const nuserInfo = await getUsrInformation(
                      userAccount?.uid!
                    );
                    userInfo?.setUserInfo(nuserInfo);

                    clearObjectLocalStorage();
                  }}
                />
              ))}
            </div>
          )}

          <Modal
            title="Add Book"
            subtitle="New Book in reading list"
            show={showInsert[0]}
          >
            <div className="p-5 text-p flex flex-col mb-5">
              <small className="w-full text-left text-gray-400">
                Book title
              </small>
              <input
                placeholder=""
                value={newReadingBook}
                className="border border-black rounded-md px-4 py-2"
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>

            <p
              className="hover:bg-gray-200 text-gray-400 hover:text-gray-500 cursor-pointer p-2 transition-all"
              onClick={() => {
                userInfo?.UserInfo?.ReadingLists[showInsert[1]].titles.push(
                  newReadingBook
                );
                updateUsrInformation(userAccount?.uid!, userInfo?.UserInfo);
                userInfo?.setUserInfo(userInfo.UserInfo);

                setShowInsert([false, -1]);
                if (typeof showInsert[0] !== "boolean")
                    showInsert[0]()
                setReadingName("Sherlock Holmes");
                clearObjectLocalStorage();
              }}
            >
              Add Book
            </p>
            <p
              className="hover:bg-red-600 text-gray-400 hover:text-white cursor-pointer rounded-b-md p-2 transition-all bg-white"
              onClick={() => setShowInsert([false, -1])}
            >
              Cancel
            </p>
          </Modal>

          <Modal
            title="Create"
            subtitle="Reading list"
            show={showCreate}
            caption="Reading lists allow you to keep track of what books you want to read, and when"
          >
            <div className="p-5 text-p flex flex-col mb-5">
              <small className="w-full text-left text-gray-400">
                Reading List Name
              </small>
              <input
                placeholder=""
                value={newReadingList}
                className="border border-black rounded-md px-4 py-2"
                onChange={(e) => setReadingName(e.target.value)}
              />

              <small className="w-full text-left text-gray-400 mt-5">
                Reading List Description
              </small>
              <textarea
                placeholder=""
                value={newReadingListDesc}
                className="border border-black rounded-md px-4 py-2"
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.keyCode === 1) {
                    createReadingList()
                  }
                }}
                onChange={(e) => {
                  setReadingDesc(e.target.value)
                }}
              />
            </div>
            <p
              className="hover:bg-gray-200 text-gray-400 hover:text-gray-500 cursor-pointer p-2 transition-all"
              onClick={createReadingList}
            >
              Create
            </p>
            <p
              className="hover:bg-red-600 text-gray-400 hover:text-white cursor-pointer rounded-b-md p-2 transition-all bg-white"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </p>
          </Modal>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setShowCreate(true)}>New Reading List</ContextMenuItem>
          <ContextMenuItem onClick={() => setShowInsert([true, userInfo?.UserInfo?.ReadingLists.length! -1])}>Add Book To Last</ContextMenuItem>
          <ContextMenuItem onClick={() => navigator.reload()}>Reload Tab</ContextMenuItem>
          <ContextMenuItem onClick={() => navigator.replace("/dashboard/suggestions")}>Goto AI</ContextMenuItem>
          <ContextMenuItem onClick={() => navigator.replace("/dashboard/suggestions")}>Change Background</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </DashboardSidebar>
  );
};

export default ReadingListManager;
