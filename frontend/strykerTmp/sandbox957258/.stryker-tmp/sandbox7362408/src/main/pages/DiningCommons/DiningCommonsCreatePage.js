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

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm";
import { Navigate } from 'react-router-dom';
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
export default function DiningCommonsCreatePage() {
  if (stryMutAct_9fa48("401")) {
    {}
  } else {
    stryCov_9fa48("401");
    const objectToAxiosParams = stryMutAct_9fa48("402") ? () => undefined : (stryCov_9fa48("402"), (() => {
      const objectToAxiosParams = commons => stryMutAct_9fa48("403") ? {} : (stryCov_9fa48("403"), {
        url: stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), "/api/ucsbdiningcommons/post"),
        method: stryMutAct_9fa48("405") ? "" : (stryCov_9fa48("405"), "POST"),
        params: stryMutAct_9fa48("406") ? {} : (stryCov_9fa48("406"), {
          code: commons.code,
          name: commons.name,
          hasSackMeal: commons.hasSackMeal,
          hasTakeOutMeal: commons.hasTakeOutMeal,
          hasDiningCam: commons.hasDiningCam,
          latitude: commons.latitude,
          longitude: commons.longitude
        })
      });

      return objectToAxiosParams;
    })());

    const onSuccess = commons => {
      if (stryMutAct_9fa48("407")) {
        {}
      } else {
        stryCov_9fa48("407");
        toast(stryMutAct_9fa48("408") ? `` : (stryCov_9fa48("408"), `New Dining Commons Created - code: ${commons.code} name: ${commons.name}`));
      }
    };

    const mutation = useBackendMutation(objectToAxiosParams, stryMutAct_9fa48("409") ? {} : (stryCov_9fa48("409"), {
      onSuccess
    }), // Stryker disable next-line all : hard to set up test for caching
    ["/api/ucsbdiningcommons/all"]);
    const {
      isSuccess
    } = mutation;

    const onSubmit = async data => {
      if (stryMutAct_9fa48("412")) {
        {}
      } else {
        stryCov_9fa48("412");
        mutation.mutate(data);
      }
    };

    if (stryMutAct_9fa48("414") ? false : stryMutAct_9fa48("413") ? true : (stryCov_9fa48("413", "414"), isSuccess)) {
      if (stryMutAct_9fa48("415")) {
        {}
      } else {
        stryCov_9fa48("415");
        return <Navigate to="/diningCommons/list" />;
      }
    }

    return <BasicLayout>
      <div className="pt-2">
        <h1>Create New Dining Commons</h1>

        <DiningCommonsForm submitAction={onSubmit} />

      </div>
    </BasicLayout>;
  }
}