import OurTable,{ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsborganizations",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
        }
    }
}

export default function OrganizationsTable({ organizations, currentUser }) {

    //const navigate = useNavigate();

    //const editCallback = (cell) => {
    //    navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    //}

    //Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsborganizations/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'orgCode',
            accessor: 'orgCode', // accessor is the "key" in the data
        },
        {
            Header: 'orgTranslationShort',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'orgTranslation',
            accessor: 'orgTranslation',
        },
        {
            Header: 'Inactive?',
            accessor: (row, _rowIndex) => String(row.inactive)
        }
    ];


    const columnsIfAdmin = [
        ...columns,
  //      ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "OrganizationsTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    //const columnsToDisplay = columns;

    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={"OrganizationsTable"}
        />;
};