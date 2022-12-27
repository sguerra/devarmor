import { FC } from "react";

export const TopMenu: FC = ()=>{
    return (<>
        <ul className="flex justify-between w-48 float-right">
            <li className="hover:bg-sky-900 hover:text-white px-6 py-4">Wagon</li>
            <li className="px-6 py-4">Guest</li>
        </ul>
    </>)
}