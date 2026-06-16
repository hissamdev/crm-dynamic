export default function Dashboard() {
    return (
        <div className=" grid grid-cols-[20rem_1fr]">
            <aside className="px-8 py-12 sticky top-0 h-screen border-r border-r-white/25">
                <span className="border-b border-b-white/25">Lists</span>
            </aside>
            <main className="mx-42 my-12 min-h-1239">
                <header className="flex">
                    <div className="px-4 py-2 border-y border-l border-white/25">
                        Box
                    </div>
                    <div className="pl-4 w-48 py-2 border-y border-l border-white/25">
                        Name
                    </div>
                    <div className="pl-4 w-48 py-2 border-y border-l border-white/25">
                        Email
                    </div>
                </header>
                <section className="flex">
                    <div className="px-4 py-2 border-b border-l border-white/25">
                        Box
                    </div>
                    <div className="px-4 w-48 py-2 border-b border-l border-white/25 text-nowrap overflow-x-auto scrollbar-none">
                        Someone's extremely length name goes here
                    </div>
                    <div className="pl-4 w-48 py-2 border-b border-l border-white/25">
                        email@gmail.com
                    </div>
                </section>
            </main>
        </div>
    );
}
