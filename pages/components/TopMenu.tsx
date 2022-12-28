import { FC } from "react";

export const TopMenu: FC = ()=>{
    // TODO: Wagon: <li className="hover:bg-sky-900 hover:text-white cursor-pointer px-6 py-4">Wagon</li>
    return (<>
        <ul className="flex justify-end w-48 float-right">
            <li className="px-6 py-4">Guest</li>
        </ul>
    </>)
}