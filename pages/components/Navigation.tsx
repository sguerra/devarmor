import { FC, ReactNode } from "react";

type NavigationItemProps = {
    children: ReactNode,
    selected?: true
}

const NavigationItem: FC<NavigationItemProps> = ({children, selected=false})=>{
    const selectedClassname = selected ? 'bg-black text-white' : ''
    const hoverClassname = 'hover:bg-black hover:text-white'
    return (
        <li className={`${selectedClassname} ${hoverClassname} py-2 px-4 my-2 mx-4`}>{children}</li>
    )
}

export const Navigation: FC = ()=>{
    return (<>
        <ul>
            <NavigationItem>All</NavigationItem>
            <NavigationItem>Most Liked</NavigationItem>
            <NavigationItem selected>Helms</NavigationItem>
            <NavigationItem>Breastplates</NavigationItem>
            <NavigationItem>Gaunlets</NavigationItem>
            <NavigationItem>Cuissets</NavigationItem>
            <NavigationItem>Greaves</NavigationItem>
            <NavigationItem>Attachments</NavigationItem>
        </ul>
    </>)
}