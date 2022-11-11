// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});

  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }

  function retrieveNS() {
    return ns;
  }

  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}

stryNS_9fa48();

function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });

  function cover() {
    var c = cov.static;

    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }

  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}

function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();

  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }

      return true;
    }

    return false;
  }

  stryMutAct_9fa48 = isActive;
  return isActive(id);
}

import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"; //import { useNavigate } from "react-router-dom";

import { hasRole } from "main/utils/currentUser";
export function cellToAxiosParamsDelete(cell) {
  if (stryMutAct_9fa48("116")) {
    {}
  } else {
    stryCov_9fa48("116");
    return stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
      url: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), "/api/ucsbdinningcommonsmenu"),
      method: stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "DELETE"),
      params: stryMutAct_9fa48("120") ? {} : (stryCov_9fa48("120"), {
        id: cell.row.values.id
      })
    });
  }
}
export default function MenuItemsTable({
  menuItem,
  currentUser
}) {
  if (stryMutAct_9fa48("121")) {
    {}
  } else {
    stryCov_9fa48("121");
    //const navigate = useNavigate();

    /*const editCallback = (cell) => {
        navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    }*/
    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(cellToAxiosParamsDelete, {
      onSuccess: onDeleteSuccess
    }, ["/api/ucsbdinningcommonsmenu/all"]); // Stryker enable all 
    // Stryker disable next-line all : TODO try to make a good test for this

    const deleteCallback = async cell => {
      deleteMutation.mutate(cell);
    };

    const columns = [{
      Header: 'diningCommonsCode',
      accessor: 'diningCommonsCode' // accessor is the "key" in the data

    }, {
      Header: 'id',
      accessor: 'id'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'station',
      accessor: 'station'
    }];
    const columnsIfAdmin = [...columns, //ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
    ButtonColumn("Delete", "danger", deleteCallback, "MenuItemsTable")];
    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    return <OurTable data={menuItem} columns={columnsToDisplay} testid={"MenuItemsTable"} />;
  }
}
;