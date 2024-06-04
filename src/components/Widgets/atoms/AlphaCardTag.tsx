/*
    Contains definations to an atom component used by AlphaCard (see AlphaCard.tsx)
*/
interface AlphaCardTagAtomProps {
    background: string,
    content: string
}
const AlphaCardTagAtom = (props: AlphaCardTagAtomProps) => {
	return (
		<span className={`rounded-full m-5 p-2 w-fit border-2`} style={{background: props.background, borderColor: props.background}}>
            {props.content}
	    </span>
	);
};

export default AlphaCardTagAtom;
