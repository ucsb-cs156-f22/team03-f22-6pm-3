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

import React from "react";
import OurTable from "main/components/OurTable";
const columns = stryMutAct_9fa48("374") ? [] : (stryCov_9fa48("374"), [stryMutAct_9fa48("375") ? {} : (stryCov_9fa48("375"), {
  Header: stryMutAct_9fa48("376") ? "" : (stryCov_9fa48("376"), 'id'),
  accessor: stryMutAct_9fa48("377") ? "" : (stryCov_9fa48("377"), 'id') // accessor is the "key" in the data

}), stryMutAct_9fa48("378") ? {} : (stryCov_9fa48("378"), {
  Header: stryMutAct_9fa48("379") ? "" : (stryCov_9fa48("379"), 'First Name'),
  accessor: stryMutAct_9fa48("380") ? "" : (stryCov_9fa48("380"), 'givenName')
}), stryMutAct_9fa48("381") ? {} : (stryCov_9fa48("381"), {
  Header: stryMutAct_9fa48("382") ? "" : (stryCov_9fa48("382"), 'Last Name'),
  accessor: stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), 'familyName')
}), stryMutAct_9fa48("384") ? {} : (stryCov_9fa48("384"), {
  Header: stryMutAct_9fa48("385") ? "" : (stryCov_9fa48("385"), 'Email'),
  accessor: stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), 'email')
}), stryMutAct_9fa48("387") ? {} : (stryCov_9fa48("387"), {
  Header: stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), 'Admin'),
  id: stryMutAct_9fa48("389") ? "" : (stryCov_9fa48("389"), 'admin'),
  accessor: stryMutAct_9fa48("390") ? () => undefined : (stryCov_9fa48("390"), (row, _rowIndex) => String(row.admin)) // hack needed for boolean values to show up

})]);
export default function UsersTable({
  users
}) {
  if (stryMutAct_9fa48("391")) {
    {}
  } else {
    stryCov_9fa48("391");
    return <OurTable data={users} columns={columns} testid={stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "UsersTable")} />;
  }
}
;