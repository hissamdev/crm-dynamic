import axios from "axios";
import SidebarLists from "./[slug]/SidebarLists";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
    const headerStore = await headers();
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    try {
        const { data } = await axios.get(
            `${process.env.API_URL}/api/lists/?id=${session?.user.id}`,
            {
                headers: Object.fromEntries(headerStore.entries()),
            },
        );

        return (
            <div className=" grid grid-cols-[20rem_1fr] bg-black">
                <SidebarLists lists={data} />
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
