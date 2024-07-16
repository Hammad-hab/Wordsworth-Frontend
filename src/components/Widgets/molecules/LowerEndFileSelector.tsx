import { BadTag, GoodTag } from "@/components/Widgets/atoms/Tags";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { asyncOnAuthStateChanged, updateUsrInformation } from "@/components/global/firestore";
import { MegaFile } from "@/components/global/interfaces";
import { btmb } from "@/components/global/superglobals";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { FaReadme } from "react-icons/fa6";
import { useRouter } from "next/router";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";

interface LowerEndFileSelectorProps {
  file: MegaFile,
  userDirId: string,
  onFileDelete: (fl: MegaFile) => void
}

const LowerEndFileSelector = (props: LowerEndFileSelectorProps) => {
  const route = useRouter()
  const handleRemoval = async () => {
    const res = await fetch("/api/requestfileremoval", {
      method: "POST",
      body: JSON.stringify({userDirId: props.userDirId, name:props.file.name})
    })
    if (res.ok) {
      const size = (await res.json()).data
      const usr = await asyncOnAuthStateChanged()
      if (usr) {
        clearObjectLocalStorage()
        updateUsrInformation(usr.uid, {storageUsed: size})
      }
      props.onFileDelete(props.file)
    } else {
      throw `delete failed`
    }
    
  }

  const handleDownload = async () => {
    const res = await fetch("/api/downloadFile", {
      method: "POST",
      body: JSON.stringify({userDirId: props.userDirId, name:props.file.name})
    })
    if (!res.ok) throw `file download generation failed`
    const buf = await res.arrayBuffer()
    const blob = window.URL.createObjectURL(new Blob([buf]));
    const anchor = document.createElement("a")
    anchor.href = blob
    anchor.setAttribute('download', props.file.name)
    anchor.click()
  }

  return (
    <div className="bg-zinc-500 w-full p-2 text-gray-300 font-semibold flex flex-row">
    <div className="w-1/2 flex flex-row gap-2">
      <p className="w-1/2">{props.file.name}</p>
      <GoodTag text={btmb(props.file.size)}/>
      <BadTag text={".pdf"}/>
    </div>
    <div className="w-1/2 flex flex-row-reverse items-center">
      <MdDelete className="text-2xl hover:text-red-500 transition-all duration-300" onClick={() => {
        toast.promise(handleRemoval, {
          success: `Successfully deleted ${props.file.name}`,
          pending: `Deleting ${props.file.name} from your cloud...`,
          error: "Oh no! We seem to have run into an error, please try again."
        })
      }}/>
      <FaCloudDownloadAlt  className="text-2xl hover:text-green-500 mr-5 transition-all duration-300" onClick={() => {
        toast.promise(handleDownload , {
          success: `Successfully Downloaded ${props.file.name}`,
          pending: `Downloading ${props.file.name} from your cloud...`,
          error: "Oh no! We seem to have run into an error, please try again."
        })
      }}/>
      <FaReadme  className="text-2xl hover:text-green-500 mr-5 transition-all duration-300" onClick={() => {
         route.replace(`/dashboard/readfile?file=${props.file.name}`)
      }}/>
    </div>
  </div>
  );
};

export default LowerEndFileSelector;