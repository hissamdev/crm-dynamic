import axios from "axios";
import SidebarLists from "../dashboard-ui/SidebarLists";
import ListTable from "../dashboard-ui/ListTable";

export default async function List({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // const list = await axios.get(`${process.env.API_URL}/api/lists/${slug}`);

    return (
        <div className="grid grid-cols-[20rem_1fr]">
            <SidebarLists />
            <ListTable slug={slug} />
        </div>
    );
}
