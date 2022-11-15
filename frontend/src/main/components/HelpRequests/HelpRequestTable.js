import OurTable, { _ButtonColumn } from "main/components/OurTable";
//import { useBackendMutation } from "main/utils/useBackend";
//import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/HelpRequestUtils"
//import { useNavigate } from "react-router-dom";
//import { hasRole } from "main/utils/currentUser";

export default function HelpRequestsTable({ requests, _currentUser }) {

    //const navigate = useNavigate();

    //const editCallback = (cell) => {
    //    navigate(`/helprequests/edit/${cell.row.values.id}`)
    //}

    // Stryker disable all : hard to test for query caching
    //const deleteMutation = useBackendMutation(
    //    cellToAxiosParamsDelete,
    //    { onSuccess: onDeleteSuccess },
    //    ["/api/helprequests/all"]
    //);
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    //const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'RequesterEmail',
            accessor: 'requesterEmail',
        },
        {
            Header: 'TeamId',
            accessor: 'teamId',
        },
        {
            Header: 'TableOrRoom',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'RequestTime',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved',
            accessor: 'solved',
            accessor: (row, _rowIndex) => String(row.solved)
        }
    ];

    //const columnsIfAdmin = [
    //    ...columns,
    //    ButtonColumn("Edit", "primary", editCallback, "HelpRequestsTable"),
    //    ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestsTable")
    //];

    //const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={requests}
        columns={columnsToDisplay}
        testid={"HelpRequestsTable"}
    />;
};