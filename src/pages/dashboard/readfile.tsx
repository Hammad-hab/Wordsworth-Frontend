interface AdobeEmbedAPIReaderProps {}
import { useUserInformation } from "@/components/global/userStandardContext";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import ReactLoading from 'react-loading';
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BorderButton from "@/components/Widgets/atoms/StandardBorderButton";
import Link from "next/link";

const AdobeEmbedAPIReader = (props: AdobeEmbedAPIReaderProps) => {
  const userContext = useUserInformation()
  const [url, setURL] = useState("");
  const route = useRouter();
  const { file, embed, scale} = route.query;
  useEffect(() => {
    (async () => {
      if (!window.URL.createObjectURL) return;
      const directoryResponse = await fetch("/api/downloadFile", {
        method: "POST",
        body: JSON.stringify({
          userDirId: userContext?.UserInfo?.userstorageid,
          name: file,
        }),
      });
      if (!directoryResponse.ok) return;
      const dat = await directoryResponse.arrayBuffer();
      const blob = window.URL.createObjectURL(new Blob([dat]));
      setURL(blob);
    })();
  }, [userContext]);
  
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className={`items-center justify-center flex flex-col ${!embed ? 'h-screen w-screen' : "w-full h-full"}`}>
        {!embed ? <Link href={"/dashboard/mylibrary"}>
          <BorderButton className="fixed top-0 left-0 z-50 m-5">Back</BorderButton>
        </Link> : ""}
        {url ? <Viewer fileUrl={url} defaultScale={scale ? parseInt(scale.toString()) : 1}  /> : <ReactLoading color="black" type="spinningBubbles" width={embed ? 30 : 80} height={embed ? 30 : 80}/>}
        {!url && embed ? <small className="text-gray-400">Loading Document Preview, please wait...</small> : ""}
      </div>
    </Worker>
  );
};

export default AdobeEmbedAPIReader;
