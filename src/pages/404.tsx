import Image from "next/image";

const HTTPError404 = (props: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error 404</h1>
        <Image src={"/page_not_found.png"} alt="404" width={500} height={500}/>
        <h1 className="text-2xl font-extrabold">We couldn{"'"}t find what you were looking for!</h1>
    </div>
  );
};

export default HTTPError404;