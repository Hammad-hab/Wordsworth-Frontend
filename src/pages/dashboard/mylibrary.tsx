import GridFileItem from "@/components/Widgets/atoms/GridFileItem";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import { auth } from "@/components/global/firebase";
import {
  asyncOnAuthStateChanged,
  updateUsrInformation,
} from "@/components/global/firestore";
import { MegaFile } from "@/components/global/interfaces";
import { useUserInformation } from "@/components/global/userStandardContext";
import { useEffect, useState, ChangeEvent, useCallback } from "react";
import { toast } from "react-toastify";
import LowerEndFileSelector from "@/components/Widgets/molecules/LowerEndFileSelector";
import FileUpload from "@/components/Widgets/atoms/FileUpload";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import { useRouter } from "next/router";

const MyLibraryPage = (props: any) => {
  const [fileIsBeingUploaded, setFileUploadStatus] = useState<boolean>(false);
  const navigator = useRouter()
  const UserInfo = useUserInformation();
  const [formInput, setFileFormInput] = useState<FormData>();
  const [directories, setDirectories] = useState<MegaFile[]>([]);
  const [selectedDirs, setSeletedDirs] = useState<MegaFile[]>([]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files!;
    if (files.length <= 0) return;
    const fileFormInput = new FormData();
    for (const file of files) {
      fileFormInput.append("file", file);
    }
    fileFormInput.append("userDirId", UserInfo?.UserInfo?.userstorageid!);
    setFileFormInput(fileFormInput);
    setFileUploadStatus(true);
  };

  const handleUploadServerSide = async () => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formInput,
    });
    const userJsonData = await response.json();
    setFileUploadStatus(false);
    if (response.status === 200) {
      const DATA = userJsonData.data;
      const usr = await asyncOnAuthStateChanged();
      if (usr) {
        clearObjectLocalStorage();
        updateUsrInformation(usr?.uid!, {
          storageUsed: DATA.size,
        });
      }
      return;
    } else if (response.status === 403) {
      if (userJsonData.data === "SPP")
        toast.error("Oh no! It's seems that you have run out of space");
      else if (userJsonData.data === "FPP")
        toast.error(
          "Oh no! It's seems that you don't have space to store this file."
        );
      throw `Err`;
    } else {
      toast.error(
        `Oh no! It seems that we have run into a problem. Error ${userJsonData.httpcode}. Please try again.`
      );
      throw `Err`;
    }
  };

  useEffect(() => {
    if (fileIsBeingUploaded !== false) {
      toast.promise(handleUploadServerSide, {
        success: "Successfully uploaded your PDF File",
        pending:
          "Please wait while we upload your file. Do not tab out while uploading.",
        error: "It seems that we have run into a problem",
      });
    }
  }, [formInput, fileIsBeingUploaded]);

  useEffect(() => {
    (async () => {
      if (!UserInfo?.UserInfo) return;
      const directoryResponse = await fetch("/api/getuserdata", {
        method: "POST",
        body: JSON.stringify({
          userDirId: UserInfo?.UserInfo?.userstorageid,
        }),
      });
      
      if (!directoryResponse.ok) {
        toast.error(
          "We have encountered an error while loading your files, please try again."
        );
        return;
      }
      
  
      const directoryData: {
        errcode: string;
        data: MegaFile[];
      } = await directoryResponse.json();
      setDirectories(directoryData.data);
    })();
  }, [UserInfo?.UserInfo, fileIsBeingUploaded]);

  return (
    <DashboardSidebar>
      <div className="h-full w-full flex flex-col">
        <div className="h-fit w-full grid grid-cols-3 lg:grid-cols-10 gap-1">
          {directories?.map((file, index) => {
            return (
              <GridFileItem
                file={file}
                key={index}
                onSelect={(fl) => setSeletedDirs([...selectedDirs, fl])}
                onDblClick={(fl) => {
                  navigator.replace(`/dashboard/readfile?file=${fl.name}&size=${fl.size}`)
                }}
                onUnSelect={(fl) =>
                  setSeletedDirs(
                    selectedDirs.filter((file) => file.name !== fl.name)
                  )
                }
              />
            );
          })}

          <FileUpload onChange={handleUpload} />
        </div>
        <div className="h-full flex flex-col-reverse w-full">
          {selectedDirs.map((file, index) => (
            <LowerEndFileSelector
              file={file}
              key={index}
              userDirId={UserInfo?.UserInfo?.userstorageid!}
              onFileDelete={(fl) => {
                setSeletedDirs(
                  selectedDirs.filter((file) => file.name !== fl.name)
                );
                setDirectories(
                  directories.filter((file) => file.name !== fl.name)
                );
              }}
            />
          ))}
        </div>
      </div>
    </DashboardSidebar>
  );
};

export default MyLibraryPage;
