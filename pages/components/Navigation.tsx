import Image from "next/image";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";

type NavigationItemProps = {
    children: ReactNode,
    type: string
}

const NavigationItem: FC<NavigationItemProps> = ({children, type})=>{
    const [selected, setSelected] = useState(()=>type=='all')

    const selectedClassname = selected ? 'bg-black text-white' : ''
    const hoverClassname = 'hover:bg-slate-800 hover:text-white cursor-pointer'

    const selectedIconClassname = selected ? 'invert' : 'hover:invert'

    const handleOnClick = useCallback(()=>{
        (new Audio("/navbar_sound.mp3")).play()
        window.dispatchEvent(new CustomEvent('navbar:toggle', {detail: type}))
    }, [])

    useEffect(()=>{
        const handleNavbarToggle = (event: Event)=>{
            const detailType = event.detail
            setSelected(type===detailType)
        }

        // listeners
        window.addEventListener('navbar:toggle', handleNavbarToggle)
        return ()=>{
            // cleanup
            window.removeEventListener('navbar:toggle', handleNavbarToggle)
        }
    })

    return (
        <li className={`${selectedClassname} ${hoverClassname} group text-xl  py-3 px-4 mt-1 mx-4 flex`} onClick={handleOnClick}>
            <Image src={`/navbar_${type}.png`} className={`${selectedIconClassname} group-hover:invert`} width="36" height="36" alt={`Icon for type: ${type}`}/>
            <span className="px-2 my-1">{children}</span>
        </li>
    )
}

export const Navigation: FC = ()=>{
    return (<>
        <ul>
            <NavigationItem type="all">All</NavigationItem>
            <NavigationItem type="stars">Most Liked</NavigationItem>
            <NavigationItem type="helms">Helms</NavigationItem>
            <NavigationItem type="breastplates">Breastplates</NavigationItem>
            <NavigationItem type="gaunlets">Gaunlets</NavigationItem>
            <NavigationItem type="cuissets">Cuissets</NavigationItem>
            <NavigationItem type="greaves">Greaves</NavigationItem>
            <NavigationItem type="attachments">Attachments</NavigationItem>
        </ul>
    </>)
}