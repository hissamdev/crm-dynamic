import axios from "axios";
import SidebarLists from "../dashboard-ui/SidebarLists";
import ListTable from "../dashboard-ui/ListTable";
import type { List, Value } from "@/src/utils/types/appTypes";

export default async function List({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const listRes = await axios.get(`${process.env.API_URL}/api/lists/${slug}`);
    const { list, values }: { list: List; values: Value[] } = listRes.data;

    return (
        <div className="grid grid-cols-[20rem_1fr]">
            <SidebarLists />
            <ListTable slug={slug} list={list} values={values} />
        </div>
    );
}
