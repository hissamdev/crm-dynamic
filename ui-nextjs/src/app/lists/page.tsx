import axios, { isAxiosError } from "axios";
import SidebarLists from "./[slug]/SidebarLists";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    try {
        const { data } = await axios.get(
            `${process.env.API_URL}/api/lists/${session?.user.id}`,
        );

        return (
            <div className=" grid grid-cols-[20rem_1fr]">
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
