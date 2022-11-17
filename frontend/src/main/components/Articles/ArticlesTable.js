import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess, _cellToAxiosParamsDelete } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/articles",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function ArticlesTable({ articles, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/articles/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/articles/all"]
    );
    //Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Date Added',
            accessor: 'dateAdded', // accessor is the "key" in the data
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'URL',
            accessor: 'url',
        }
    ];

     const columnsIfAdmin = [
         ...columns,
         ButtonColumn("Edit", "primary", editCallback, "ArticlesTable", "id"),
         ButtonColumn("Delete", "danger", deleteCallback, "ArticlesTable", "id")
     ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={"ArticlesTable"}
    />;
};