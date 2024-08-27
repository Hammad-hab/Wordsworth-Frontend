import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Image from "next/image";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import { useRef, useState } from "react";
import Modal from "../molecules/Modal";

interface BookListItemProps {
  bookTitle: string;
  bookTitlePageURL: string;
  onDelBook: (book_name: string) => Promise<void>;
}

const BookListItem = (props: BookListItemProps) => {
  const self = useRef<any>(null);
  const [showMore, setShowMore] = useState(false);
  return (
    <li
      ref={self}
      className="p-2 bg-gray-200 m-2 flex flex-row items-center gap-2 rounded-sm hover:bg-gray-300 transition-all"
      onClick={() => setShowMore(true)}
    >
      {props.bookTitlePageURL ? (
        <Image
          src={props.bookTitlePageURL}
          width={50}
          height={50}
          alt={props.bookTitle}
        />
      ) : (
        <div className="skel_animation w-[50px] h-[50px]"></div>
      )}

      <p className="w-full pr-10">{props.bookTitle}</p>
      <p
        className="text-gray-400 hover:text-red-500 cursor-pointer transition-all"
        onClick={() => {
          toast.promise(props.onDelBook(props.bookTitle), {
            success: `Successfully removed ${props.bookTitle}`,
            pending: `Removing book ${props.bookTitle} from reading list`,
            error: "Failed to remove book from reading list, please try again",
          });
          if (self.current instanceof HTMLLIElement) {
            self.current.setAttribute("style", "display: none;");
          }
          clearObjectLocalStorage();
        }}
      >
        <MdOutlineRemoveCircleOutline className="inline ml-2" />
      </p>
{/* 
      <Modal
        title={"About Book"}
        subtitle={props.bookTitle}
        caption="Reading lists allow you to keep track of what books you want to read, and when"
        show={showMore}
      >
        <div className="p-5 text-p flex flex-col mb-5">
        </div>
        <p className="hover:bg-gray-200 text-gray-400 hover:text-gray-500 cursor-pointer p-2 transition-all">
          Create
        </p>
        <p
          className="hover:bg-red-600 text-gray-400 hover:text-white cursor-pointer rounded-b-md p-2 transition-all bg-white"
          onClick={() => setShowMore(false)}
        >
          Cancel
        </p>
      </Modal> */}
    </li>
  );
};

export default BookListItem;
