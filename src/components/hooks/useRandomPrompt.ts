import { useMemo, useEffect, useState } from "react";
import { getRandomBookPrompts } from "../global/superglobal_utils";

const useRandomPrompts = () => {
    const prompts = useMemo(() => [
        "I need a book that feels like a warm hug after a long day. Any suggestions?",
        "Recommend a book that will make me laugh out loud in public places.",
        "What's a book that has a plot twist I won't see coming?",
        "I want to escape to a magical world. What book can take me there?",
        "Give me a book with a strong, kick-butt female lead.",
        "What's a book that will make me stay up all night because I can't put it down?",
        "Recommend a book where the villain is just as interesting as the hero.",
        "I need a book that will make me cry happy tears.",
        "What's a book with a love story that feels real and not cliché?",
        "I want a book that will make me think deeply about life and my place in it.",
        "Give me a book where animals play a significant role in the story.",
        "What's a book with a unique setting that feels like a character itself?",
        "Recommend a book that's perfect for a rainy day.",
        "I need a book with a mystery that I can try to solve along with the characters.",
        "What's a book that has an epic adventure and a journey worth taking?"
    ], []);


    const [randomPrompts, setRandomPrompts] = useState<string[]>([]);
    useEffect(() => {
        const randomPr = getRandomBookPrompts(3, prompts);
        setRandomPrompts(randomPr);
    }, [prompts]);
    return randomPrompts
}

export default useRandomPrompts