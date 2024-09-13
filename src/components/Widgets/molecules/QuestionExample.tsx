interface QuestionExampleProps {
  onClick: () => void;
  label: string;
}
const QuestionExample = (props: QuestionExampleProps) => {
  return (
    <div
      className="mt-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-700 p-[2px] rounded-md"
      onClick={props.onClick}
    >
      <div
        className={`bg-zinc-500 text-zinc-200 p-5 rounded-sm shadow-md hover:opacity-80 transition-all card cursor-pointer h-full`}
      >
        {props.label}
      </div>
    </div>
  );
};

export default QuestionExample;
