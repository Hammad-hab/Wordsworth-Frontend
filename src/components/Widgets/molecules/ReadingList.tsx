import { useEffect, useState } from "react";
import Light from "../Light";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAddCircle } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useUserInformation } from "@/components/global/userStandardContext";


interface ReadingListProps {
  name: string;
  titles: string[];
  description: any;
  onAdd: () => void;
  onDel: () => Promise<void>;
}
const ReadingList = (props: ReadingListProps) => {
  const [bookImages, setBookImages] = useState<string[]>([]);
  const [hasBeenDeleted, setDeletionState] = useState<boolean>(false)
  const userInfo = useUserInformation()
  useEffect(() => {
    console.log("Running");
    (async () => {
      const titles = [];
      for await (const title of props.titles) {
        const res = await fetch(
          `https://words-worth-backend.vercel.app/get_book_img?title=${title}`
        );
        const json = await res.json();
        titles.push(json["results"]["img"]);
      }
      setBookImages(titles);
    })();
  }, [userInfo?.UserInfo, props.titles]);
  if (!hasBeenDeleted)
    return (
      <>
        {/* // <div className="bg-gradient-to-br p-1 rounded-md from-blue-500 via-blue-400 to-blue-600"> */}
        {/* <div className="h-full w-full bg-white">

        <p className="text-2xl p-5">{props.name}</p>
          <ul className="">
          </ul>
          </div> */}
          
        <Card>
          <CardHeader>
            <CardTitle>{props.name}</CardTitle>
            <CardDescription>{props?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {props.titles.length
              ? props.titles.map((title, k) => {
                  return (
                    <li
                      key={k}
                      className="p-2 bg-gray-200 m-2 flex flex-row items-center gap-2 rounded-sm"
                    >
                      {bookImages[k] ? (
                        <Image
                          src={bookImages[k]}
                          width={50}
                          height={50}
                          alt={title}
                          className="skel_animation"
                        />
                      ) : (
                        <div className="skel_animation w-[50px] h-[70px]"></div>
                      )}

                      {title}
                    </li>
                  );
                })
              : "No books in this reading list"}
          </CardContent>
          <CardFooter className="flex flex-row items-start ">
            {/* <HoverCard>
              <HoverCardTrigger> */}
                <p
                  className="text-gray-400 hover:text-black cursor-pointer transition-all block"
                  onClick={props.onAdd}
                >
                  <IoMdAddCircle className="inline ml-2" />
                </p>
              {/* </HoverCardTrigger>
              <HoverCardContent>
                Add a new book to the reading list. <br />
              </HoverCardContent>
            </HoverCard> */}

            {/* <HoverCard>
              <HoverCardTrigger> */}
                <p className="text-gray-400 hover:text-red-500 cursor-pointer transition-all" onClick={e => {
                  props.onDel().then(() => {
                    setDeletionState(true)

                  })
                  toast.promise(async() => {
                   await props.onDel()
                   setDeletionState(true)
                  }, {
                    success: "Sucessfully deleted Reading List",
                    error: "Failed to delete list, please try again",
                    pending: "Deleting list..."
                  })
                }}>
                  <IoTrashBinSharp className="inline ml-2" />
                </p>
              {/* </HoverCardTrigger>
              <HoverCardContent>
                Delete this reading list. <br />
                <strong>Warning</strong>: this action cannot be undone
              </HoverCardContent>
            </HoverCard> */}
          </CardFooter>
        </Card>

        {/* // </div> */}
      </>
    );
  else
    return null
};

export default ReadingList;
