import { PlusIcon } from "lucide-react";

export default function CreateList() {
    return (
        <div className="grid grid-cols-[20rem_1fr]">
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
            </aside>
            <main className="mx-30 my-20">
                <h1 className="text-3xl font-semibold">Create a New List</h1>
                <form className="mt-12">
                    <label className="block">Enter list name</label>
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="text"
                            className="border w-8 h-8 rounded-md"
                        />
                        <input type="text" className="border" />
                    </div>

                    <label className="mt-8 block">Create a description</label>
                    <textarea className="mt-4 min-w-80 max-w-full border resize"></textarea>

                    <label className="mt-8 block">Enter list name</label>
                    <input type="text" className="mt-4 border" />
                </form>
            </main>
        </div>
    );
}
