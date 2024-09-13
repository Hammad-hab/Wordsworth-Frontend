import Image from "next/image";

interface WordsWorthLogoProps {
    width: number,
    height: number
}

const WordsWorthLogo = (props: WordsWorthLogoProps) => {
  return (
    <Image
      src="/Images/logo.jpeg"
      width={props.width}
      height={props.height}
      alt="Wordsworth Logo"
      className="rounded-full block m-auto"
    />
  );
};

export default WordsWorthLogo;
