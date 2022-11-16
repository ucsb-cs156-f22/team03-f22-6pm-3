import OurTable, { _ButtonColumn} from "main/components/OurTable";
import { _useBackendMutation } from "main/utils/useBackend";
//import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { _hasRole } from "main/utils/currentUser";

// export function cellToAxiosParamsDelete(cell) {
//     return {
//         url: "/api/menuitemreview",
//         method: "DELETE",
//         params: {
//             code: cell.row.values.code
//         }
//     }
// }

export default function MenuItemReviewsTable({ menuItemReviews, _currentUser }) {

    const _navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/menuItemReviews/edit/${cell.row.values.code}`)
    // }

    // // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/menuitemreview/all"]
    // );
    // // Stryker enable all 

    // // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: "id",
            accessor: "id"
        },
        {
            Header: 'Item ID',
            accessor: 'itemId', 
        },
        {
            Header: 'Reviewer Email',
            accessor: 'reviewerEmail',
        },
        {
            Header: 'Stars',
            accessor: 'stars',
        },
        {
            Header: 'Date Reviewed',
            accessor: 'dateReviewed',
        },
        {
            Header: 'Comments',
            accessor: 'comments',
        },
    ];

    const testid = "MenuItemReviewsTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    //const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    const columnsToDisplay = columns;

    return <OurTable
        data={menuItemReviews}
        columns={columnsToDisplay}
        testid={testid}
    />;
};