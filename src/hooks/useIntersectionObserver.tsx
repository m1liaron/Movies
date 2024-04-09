import {MutableRefObject, useEffect, useRef, useState} from "react";

interface Options {
    threshold?: number;
    root?: Element;
    rootMargin?: string;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {
    const { threshold = 1.0, root = null, rootMargin = "0px" } = options;
    const targetRef = useRef(null);

    const [entry, setEntry] = useState<IntersectionObserverEntry>()


    function  callBackFn(entries: IntersectionObserverEntry[]) {
        const [entry] = entries;
        setEntry(entry)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callBackFn, {threshold, root, rootMargin})
        const currentRef = targetRef.current;
        if(currentRef){
            observer.observe(currentRef)
        }
        return function (){
            if(currentRef){
                observer.disconnect()
            }
        }
    }, [root, rootMargin, threshold])

    return [targetRef, entry]
}