interface AdobeEmbedAPIReaderProps {}
import { useUserInformation } from "@/components/global/userStandardContext";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import ReactLoading from "react-loading";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BorderButton from "@/components/Widgets/atoms/StandardBorderButton";
import Link from "next/link";
import { ImExit } from "react-icons/im";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
// Import styles
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const renderHighlightTarget = (props: any) => {
  return (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: "100",
      }}
    >

    </div>
  );
};
const AdobeEmbedAPIReader = (props: AdobeEmbedAPIReaderProps) => {
  const highlight = highlightPlugin({
    trigger: Trigger.TextSelection,
    renderHighlightTarget,
  });
  const userContext = useUserInformation();
  const [url, setURL] = useState("");
  const route = useRouter();
  const { file, embed, scale, size } = route.query;
  const [ratio, setRatio] = useState(0);
  // useEffect(() => {
  //   (async () => {
  //     if (!window.URL.createObjectURL) return;
  //     if (!userContext?.UserInfo?.userstorageid || !file) return;
  //     const directoryResponse = await fetch("/api/downloadFile", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/pdf",
  //       },
  //       body: JSON.stringify({
  //         userDirId: userContext?.UserInfo?.userstorageid,
  //         name: file,
  //       }),
  //     });
  //     const reader = directoryResponse..getReader();

  //     let receivedLength = 0;
  //     const chunks = [];

  //     while (true) {
  //       const { done, value } = await reader.read();

  //       if (done) {
  //         console.log("done");
  //         break;
  //       }

  //       chunks.push(value);
  //       receivedLength += value.length;

  //       console.log(
  //         `Received ${receivedLength} bytes (${chunks.length} chunks)`
  //       );
  //     }

  //     const blob = new Blob(chunks);
  //     // console.log(await directoryResponse.text())
  //     // const dat = await directoryResponse.arrayBuffer();
  //     // console.log(dat)
  //     // const blob = window.URL.createObjectURL(new Blob([dat]));
  //     // console.log(blob)
  //     // setURL(blob);
  //     console.log("Done");
  //   })();
  // }, [userContext]);
  useEffect(() => {
    (async () => {
      if (!window.URL.createObjectURL) return;
      if (!userContext?.UserInfo?.userstorageid || !file) return;

      try {
        const directoryResponse = await fetch("/api/downloadFile", {
          method: "POST",
          body: JSON.stringify({
            userDirId: userContext?.UserInfo?.userstorageid,
            name: file,
          }),
        });

        if (!directoryResponse.ok) {
          console.error("Response not OK:", directoryResponse.status);
          return;
        }

        // Check if the response is a stream
        const reader = directoryResponse.body!.getReader();
        const chunks = [];
        let receivedLength = 0;
        // Read the stream
        while (true) {
          const { done, value } = await reader.read();
          if (done) break; // Exit the loop when done

          chunks.push(value);
          receivedLength += value.length;
          const percentage = receivedLength / parseInt(size?.toString()!);
          if (percentage > ratio) {
            setRatio(percentage);
          }
        }

        // Create a Blob from the chunks
        const blob = new Blob(chunks, { type: "application/pdf" });
        const blobUrl = window.URL.createObjectURL(blob);
        setURL(blobUrl); // Set the URL for the PDF
        console.log("Blob URL:", blobUrl);
        console.log("Done");
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [userContext, file]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div
        className={`items-center justify-center flex flex-col ${
          !embed ? "h-screen w-screen" : "w-full h-full"
        }`}
      >
        {!embed ? (
          <Link href={"/dashboard/mylibrary"}>
            <ImExit className="fixed top-0 left-0 z-50 m-5 text-2xl" />
          </Link>
        ) : (
          ""
        )}
        {url ? (
          <Viewer
            fileUrl={url}
            defaultScale={scale ? parseInt(scale.toString()) : 1}
            plugins={[highlight]}
          />
        ) : (
          <>
            <ReactLoading
              color="black"
              type="spinningBubbles"
              width={embed ? 30 : 80}
              height={embed ? 30 : 80}
            />
            <small className="mt-5">
              {(ratio * 100).toPrecision(3)}% loaded
            </small>
            <meter
              value={ratio * 100}
              max={100}
              min={0}
              className="w-1/12"
            ></meter>
          </>
        )}
        {!url && embed ? (
          <small className="text-gray-400">
            Loading Document Preview, please wait...
          </small>
        ) : (
          ""
        )}
      </div>
    </Worker>
  );
};

export default AdobeEmbedAPIReader;
