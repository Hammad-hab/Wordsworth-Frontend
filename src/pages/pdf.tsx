import { uploadMegaApp } from "@/components/global/megaWrapper";
import { useEffect, useRef } from "react";

export default function Home() {
 
  const fileInput = useRef<HTMLInputElement>(null);
  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const file = fileInput?.current?.files?.[0]!

    const response = uploadMegaApp(file.name, await file.text())
  }
  return (
      <form className="bg-red-500">
      <label>
        <span>Upload a file</span>
        <input type="file" name="file" ref={fileInput}/>
      </label>
      <button type="submit" onClick={(e) => uploadFile(e)}>Submit</button>
    </form>
  );
}
