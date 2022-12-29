import Image from "next/image";
import { FC } from "react";

export const TopMenu: FC = ()=>{
    // TODO: Wagon: <li className="hover:bg-sky-900 hover:text-white cursor-pointer px-6 py-4">Wagon</li>
    return (<>
        <ul className="flex justify-end w-48 float-right">
            <li className="flex mx-2 mt-1">
                <Image src="/topmenu_user.png" width="36" height="36" alt="Current user icon"/>
                <span className="text-xl ml-2 mt-1">Guest</span>
            </li>
        </ul>
    </>)
}