import { FC, useCallback } from "react";

export const SearchInput: FC = ()=>{
    let timeout: any = null

    const handleKeyUp = useCallback(()=>{
        // clear debounce timeout
        if(timeout) clearTimeout(timeout)
        // set action in debounce setTimeout
        timeout = setTimeout(()=>{
            const text = document.getElementById('searchInput')?.value
            window.dispatchEvent(new CustomEvent('search:text', {detail: text}))
        }, 500)
    }, [])

    return (<>
        <input id="searchInput" type="text" placeholder="Search in the armory" className="py-2 px-4 w-72" onKeyUp={handleKeyUp}></input>
    </>)
}