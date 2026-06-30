import axios from "axios";
import SidebarLists from "./SidebarLists";
import ListTable from "./ListTable";
import type { ApiList, List, Value } from "@/src/utils/types/appTypes";
import { headers } from "next/headers";

export default async function List({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const headerStore = await headers();
    const { slug } = await params;
    const listRes = await axios.get(
        `${process.env.API_URL}/api/lists/${slug}`,
        { headers: Object.fromEntries(headerStore.entries()) },
    );
    const { list, values }: { list: List; values: Value[] } = listRes.data;
    const res: ApiList = await axios.get(`${process.env.API_URL}/api/lists`, {
        headers: Object.fromEntries(headerStore.entries()),
    });
    const { data } = res;

    return (
        <div className="flex">
            <SidebarLists lists={data} />
            <ListTable slug={slug} list={list} values={values} />
        </div>
    );
}
