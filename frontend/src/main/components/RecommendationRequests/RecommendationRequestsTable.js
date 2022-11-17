import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/recommendationrequests",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function RecommendationRequestsTable({ recommendations, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/recrequests/edit/${cell.row.values.code}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/recommendationrequests/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', 
        },
        {
            Header: 'RequesterEmail',
            accessor: 'requesterEmail',
        },
        {
            Header: 'ProfessorEmail',
            accessor: 'professorEmail', 
        },
        {
            Header: 'DateRequested',
            accessor: 'dateRequested',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'DateNeeded',
            accessor: 'dateNeeded',
        },
        {
            Header: 'Done?',
            id: 'done', // needed for tests
            accessor: (row, _rowIndex) => String(row.done) // hack needed for boolean values to show up
        },
    ];

    const testId = "RecommendationRequestsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, testId)
    ];

    //ButtonColumn("Edit", "primary", editCallback, testid),

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={recommendations}
        columns={columnsToDisplay}
        testid={testId}
    />;
};