import Image from "next/image";
import { FC, useCallback } from "react";

export const SearchInput: FC = ()=>{
    let timeout: any = null

    const handleKeyUp = useCallback(()=>{
        // clear debounce timeout
        if(timeout) clearTimeout(timeout)
        // set action in debounce setTimeout
        timeout = setTimeout(()=>{
            (new Audio('/search_sound.mp3')).play()
            const text = document.getElementById('searchInput')?.value
            window.dispatchEvent(new CustomEvent('search:text', {detail: text}))
        }, 500)
    }, [])

    return (<>
        <input id="searchInput" type="text" placeholder="Search in the armory" className="rounded-3xl border-slate-500 border-solid border-2 py-2 px-4 w-72 pl-10" onKeyUp={handleKeyUp}>
        </input><Image src="/search_text.png" className="-mt-8 ml-3 opacity-75" width={20} height={20} alt="Search icon"/>
    </>)
}