// @ts-nocheck
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

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
export function cellToAxiosParamsDelete(cell) {
  if (stryMutAct_9fa48("72")) {
    {}
  } else {
    stryCov_9fa48("72");
    return stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
      url: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "/api/ucsbdiningcommons"),
      method: stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "DELETE"),
      params: stryMutAct_9fa48("76") ? {} : (stryCov_9fa48("76"), {
        code: cell.row.values.code
      })
    });
  }
}
export default function DiningCommonsTable({
  diningCommons,
  currentUser
}) {
  if (stryMutAct_9fa48("77")) {
    {}
  } else {
    stryCov_9fa48("77");
    const navigate = useNavigate();

    const editCallback = cell => {
      if (stryMutAct_9fa48("78")) {
        {}
      } else {
        stryCov_9fa48("78");
        navigate(stryMutAct_9fa48("79") ? `` : (stryCov_9fa48("79"), `/diningCommons/edit/${cell.row.values.code}`));
      }
    }; // Stryker disable all : hard to test for query caching


    const deleteMutation = useBackendMutation(cellToAxiosParamsDelete, {
      onSuccess: onDeleteSuccess
    }, ["/api/ucsbdiningcommons/all"]); // Stryker enable all 
    // Stryker disable next-line all : TODO try to make a good test for this

    const deleteCallback = async cell => {
      deleteMutation.mutate(cell);
    };

    const columns = [{
      Header: 'Code',
      accessor: 'code'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Sack Meal?',
      id: 'hasSackMeal',
      // needed for tests
      accessor: (row, _rowIndex) => String(row.hasSackMeal) // hack needed for boolean values to show up

    }, {
      Header: 'Takeout Meal?',
      id: 'hasTakeOutMeal',
      // needed for tests
      accessor: (row, _rowIndex) => String(row.hasTakeOutMeal) // hack needed for boolean values to show up

    }, {
      Header: 'Dining Cam?',
      id: 'hasDiningCam',
      // needed for tests
      accessor: (row, _rowIndex) => String(row.hasDiningCam) // hack needed for boolean values to show up

    }, {
      Header: 'Latitude',
      accessor: 'latitude'
    }, {
      Header: 'Longitude',
      accessor: 'longitude'
    }];
    const testid = "DiningCommonsTable";
    const columnsIfAdmin = [...columns, ButtonColumn("Edit", "primary", editCallback, testid), ButtonColumn("Delete", "danger", deleteCallback, testid)];
    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
    return <OurTable data={diningCommons} columns={columnsToDisplay} testid={testid} />;
  }
}
;