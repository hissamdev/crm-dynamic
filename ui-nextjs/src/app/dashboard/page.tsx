import ListTable from "./dashboard-ui/ListTable";
import SidebarLists from "./dashboard-ui/SidebarLists";

export type Row = {
    id: number;
    listId: number;
    values: Record<string, string>;
};

export default function Dashboard() {
    return (
        <div className=" grid grid-cols-[20rem_1fr]">
            <SidebarLists />
        </div>
    );
}
