import { useMemo, useEffect, useState } from "react";
import { getRandomBookPrompts } from "../global/superglobal_utils";

const useRandomPrompts = () => {
    const prompts = useMemo(() => [
        "Suggest a comforting book for relaxation.",
        "Recommend a book guaranteed to make me laugh.",
        "I want a book with an unexpected plot twist.",
        "Take me to a magical world with a book.",
        "Give me a book with a strong female protagonist.",
        "I need a book so good, I can't put it down.",
        "Recommend a book with a fascinating villain.",
        "I want a book to make me cry happy tears.",
        "Suggest a book with a realistic love story.",
        "I need a book to make me think deeply about life.",
        "Give me a book featuring animals as key characters.",
        "I want a book with a unique, characterful setting.",
        "Recommend a perfect book for a rainy day.",
        "I need a book with a mystery to solve.",
        "Suggest a book with an epic adventure journey.",
        "Discuss the darkness in Paradise Lost.",
        "What are the rebellion themes in Prometheus Unbound?",
        "Explain \"His dark materials to create more worlds.\"",
        "Explain Samuel Beckett's Waiting for Godot.",
        "Recommend a novel similar to Sophie's World."
    ], []);


    const [randomPrompts, setRandomPrompts] = useState<string[]>([]);
    useEffect(() => {
        const randomPr = getRandomBookPrompts(3, prompts);
        setRandomPrompts(randomPr);
    }, [prompts]);
    return randomPrompts
}

export default useRandomPrompts