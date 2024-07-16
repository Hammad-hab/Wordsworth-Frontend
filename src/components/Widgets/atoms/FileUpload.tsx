import { ChangeEventHandler } from "react";
import { IoMdAdd } from "react-icons/io";

interface FileUploadProps {
    onChange: ChangeEventHandler<HTMLInputElement>,
    accept?: string,
}

const FileUpload = (props: FileUploadProps) => {
  return (
    <>
      <label htmlFor="fileinput">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="rounded-full border-2 border-gray-400 p-5 text-gray-400 hover:bg-gray-400 hover:text-white flex flex-col items-center justify-center">
            <IoMdAdd className="text-4xl transition-colors" />
          </div>
        </div>
      </label>
      <input
        type="file"
        accept={props.accept ? props.accept : ".pdf, .epub"}
        className="hidden select-none"
        onChange={props.onChange}
        id="fileinput"
      />
    </>
  );
};

export default FileUpload;
