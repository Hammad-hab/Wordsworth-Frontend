import { cache, useCallback, useEffect, useRef, useState } from "react";
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
import { useUserAccountInformation, useUserInformation } from "@/components/global/userStandardContext";
import BookListItem from "../atoms/BookListItem";
import { setUsrInformation } from "@/components/global/firestore";

interface ReadingListProps {
  name: string;
  titles: string[];
  description: any;
  onAdd: (reloader: any) => void;
  onDel: () => Promise<void>;
  index: number;
}
const ReadingList = (props: ReadingListProps) => {
  const [bookImages, setBookImages] = useState<string[]>([]);
  const [hasBeenDeleted, setDeletionState] = useState<boolean>(false);
  const [reloadTitles, setReloadTitles] = useState<boolean>(true);
  const cacheTitles = useRef<any[]>([]);
  const userInfo = useUserInformation();
  const userAccount = useUserAccountInformation();

  const fetchBookTitles = useCallback(() => {
    (async () => {
      console.log("Fetching titles");
      const titles = [];
      for (const title of props.titles) {
        if (cacheTitles.current.includes(title)) titles.push(cacheTitles.current.find(v => v === title)) 
        try {
          const res = await fetch(
            `https://words-worth-backend.vercel.app/get_book_img?title=${title}`
          );
          const json = await res.json();
          titles.push(json["results"]["img"]);
        } catch {
          titles.push(
            "https://www.drupal.org/files/issues/2019-07-21/missing.png"
          );
        }
      }
      setBookImages(titles);
    })();
  }, [props.titles]);

  const onDeleteBook = useCallback((book_title: string): Promise<void> => {
    if (!userInfo?.UserInfo?.ReadingLists[props.index].titles) return new Promise(() => {})

    userInfo.UserInfo.ReadingLists[props.index].titles = userInfo?.UserInfo?.ReadingLists[props.index].titles.filter(x => x !== book_title)
    userInfo.setUserInfo(userInfo.UserInfo)
    setReloadTitles(true)
    return setUsrInformation(userAccount?.uid!, userInfo.UserInfo)

  }, [props.index, userInfo])

  useEffect(() => {
    if (!reloadTitles) return;
    fetchBookTitles();
    setReloadTitles(false);
  }, [userInfo?.UserInfo, props.titles, fetchBookTitles, reloadTitles]);

  if (!hasBeenDeleted)
    return (
      <>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{props.name}</CardTitle>
            <CardDescription>{props?.description}</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            {userInfo?.UserInfo?.ReadingLists[props.index].titles && userInfo?.UserInfo?.ReadingLists[props.index].titles.length! > 0
              ? props.titles.map((title, k) => <BookListItem key={k} bookTitlePageURL={bookImages[k]} bookTitle={title} onDelBook={onDeleteBook}/>)
              : "No books in this reading list"}
          </CardContent>
          <CardFooter className="flex flex-row items-start ">
            <p
              className="text-gray-400 hover:text-black cursor-pointer transition-all block"
              onClick={() => {
                props.onAdd(() => setReloadTitles(true));
              }}
            >
              <IoMdAddCircle className="inline ml-2" />
            </p>

            <p
              className="text-gray-400 hover:text-red-500 cursor-pointer transition-all"
              onClick={(e) => {
                props.onDel().then(() => {
                  setDeletionState(true);
                });
                toast.promise(
                  async () => {
                    await props.onDel();
                    setDeletionState(true);
                  },
                  {
                    success: "Sucessfully deleted Reading List",
                    error: "Failed to delete list, please try again",
                    pending: "Deleting list...",
                  }
                );
              }}
            >
              <IoTrashBinSharp className="inline ml-2" />
            </p>
          </CardFooter>
        </Card>
      </>
    );
  else return null;
};

export default ReadingList;
