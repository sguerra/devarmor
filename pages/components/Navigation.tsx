import { FC, ReactNode, useCallback, useEffect, useState } from "react";

type NavigationItemProps = {
    children: ReactNode,
    type: string
}

const NavigationItem: FC<NavigationItemProps> = ({children, type})=>{
    const [selected, setSelected] = useState(()=>type=='all')

    const selectedClassname = selected ? 'bg-black text-white' : ''
    const hoverClassname = 'hover:bg-black hover:text-white cursor-pointer'

    const handleOnClick = useCallback(()=>{
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
        <li className={`${selectedClassname} ${hoverClassname} py-2 px-4 my-2 mx-4`} onClick={handleOnClick}>{children}</li>
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