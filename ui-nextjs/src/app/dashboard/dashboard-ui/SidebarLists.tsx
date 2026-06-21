import { ApiList } from "@/src/utils/types/appTypes";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function SidebarLists() {
    const res: ApiList = await axios.get(`${process.env.API_URL}/api/lists`);
    const { data: lists } = res;

    return (
        <aside className="px-8 py-12 sticky top-0 h-screen border-r border-r-white/25">
            <div className="border-b border-b-white/25">
                <span className="flex gap-2">
                    Lists
                    <button className="h-fit w-fit">
                        <PlusIcon
                            size={18}
                            className="bg-blue-700 rounded-sm hover:bg-blue-700/80 cursor-pointer"
                        />
                    </button>
                </span>
            </div>
            <div className="mt-4">
                {!lists || lists.length === 0 ? (
                    <div></div>
                ) : lists.length > 0 ? (
                    lists.map((list) => (
                        <Link
                            key={list.id}
                            href={`/dashboard/${list.id}`}
                            className="block px-4 py-2 w-full text-[15px] font-semibold tracking-wider bg-white/10 hover:bg-white/5 rounded-md"
                        >
                            {list.name}
                        </Link>
                    ))
                ) : (
                    <div>Nothing</div>
                )}
            </div>
        </aside>
    );
}
