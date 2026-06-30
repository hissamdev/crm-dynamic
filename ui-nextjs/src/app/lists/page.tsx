import axios from "axios";
import SidebarLists from "./[slug]/SidebarLists";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { List } from "@/src/utils/types/appTypes";

export default async function Dashboard() {
    const headerStore = await headers();
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    try {
        const { data }: { data: List[] } = await axios.get(
            `${process.env.API_URL}/api/lists/?id=${session?.user.id}`,
            {
                headers: Object.fromEntries(headerStore.entries()),
            },
        );

        return (
            <div className="flex bg-black">
                <SidebarLists lists={data} />
                <div className="text-white mx-40 mt-40 text-lg font-inter border border-gray-500 rounded-md px-4 py-4 h-80 w-full">
                    No lists found
                </div>
            </div>
        );
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error(
                "Fetch failed\nStatus:",
                err.response?.status,
                "\n Data:",
                err.response?.data,
            );
        } else {
            console.error(err);
        }
    }
}
