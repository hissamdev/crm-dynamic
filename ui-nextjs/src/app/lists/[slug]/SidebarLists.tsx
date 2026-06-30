"use client";

import { List } from "@/src/utils/types/appTypes";
import { PanelLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SidebarLists({ lists }: { lists: List[] }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <aside
            className={`px-8 py-12 sticky top-0 h-screen border-r border-r-white/25 transition-all duration-300 ${showSidebar ? "w-100" : "w-10"}`}
        >
            <div className="absolute top-5 -right-12">
                <button onClick={() => setShowSidebar((prev) => !prev)}>
                    <PanelLeft className="text-white/70 hover:text-white/90 cursor-pointer" />
                </button>
            </div>
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
                            href={`/lists/${list.id}`}
                            className={`block px-4 py-2 w-full text-[15px] font-semibold tracking-wider text-nowrap bg-white/10 hover:bg-white/5 rounded-md`}
                        >
                            {list.emoji}{" "}
                            <span
                                className={`transition-all ${!showSidebar ? "opacity-0" : "opacity-100"}`}
                            >
                                {list.name}
                            </span>
                        </Link>
                    ))
                ) : (
                    <div>Nothing</div>
                )}
            </div>
        </aside>
    );
}
