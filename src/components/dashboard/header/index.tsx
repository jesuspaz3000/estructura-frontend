"use client"

import Image from "next/image"
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';

function Header() {
    return (
        <div className="tw-flex tw-justify-between tw-items-center tw-py-4 tw-px-10 tw-bg-slate-500/20">
            <div className="tw-flex tw-items-center tw-gap-4">
                <div>
                    <Image
                        src={'/image/bananero.jpg'}
                        height={50}
                        width={50}
                        alt="bananero"
                        className="tw-rounded-full"
                    />
                </div>
                <div>
                    <h1>Producciones Loco Vanilla</h1>
                </div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
                <IconButton>
                    <PersonIcon />
                </IconButton>
                <h1>Gabiño</h1>
            </div>
        </div>
    )
}

export default Header