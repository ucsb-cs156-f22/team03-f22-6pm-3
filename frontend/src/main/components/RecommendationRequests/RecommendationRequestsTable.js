import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/recommendationrequests",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function RecommendationRequestsTable({ recrequests, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/recrequests/edit/${cell.row.values.code}`)
    }

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
            Header: 'id',
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

    const testid = "DiningCommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={recrequests}
        columns={columnsToDisplay}
        testid={"RecommendationRequestsTable"}
    />;
};