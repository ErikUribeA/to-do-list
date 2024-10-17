import Link from "next/link"

export default function MainNavbar(){
    return(
        <div className="flex mx-3 justify-around p-4 border-b-[3px] border-[#00ffff]">
            <Link href="/">Home</Link>
            <Link href="/createT">Create a new Task</Link>
        </div>
    )
}