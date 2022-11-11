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
import { useParams } from "react-router-dom";
import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm";
import { Navigate } from 'react-router-dom';
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
export default function DiningCommonsEditPage() {
  if (stryMutAct_9fa48("416")) {
    {}
  } else {
    stryCov_9fa48("416");
    let {
      code
    } = useParams();
    const {
      data: commons,
      _error,
      _status
    } = useBackend( // Stryker disable next-line all : don't test internal caching of React Query
    [`/api/ucsbdiningcommons?code=${code}`], stryMutAct_9fa48("419") ? {} : (stryCov_9fa48("419"), {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: stryMutAct_9fa48("421") ? `` : (stryCov_9fa48("421"), `/api/ucsbdiningcommons`),
      params: stryMutAct_9fa48("422") ? {} : (stryCov_9fa48("422"), {
        code
      })
    }));
    const objectToAxiosPutParams = stryMutAct_9fa48("423") ? () => undefined : (stryCov_9fa48("423"), (() => {
      const objectToAxiosPutParams = commons => stryMutAct_9fa48("424") ? {} : (stryCov_9fa48("424"), {
        url: stryMutAct_9fa48("425") ? "" : (stryCov_9fa48("425"), "/api/ucsbdiningcommons"),
        method: stryMutAct_9fa48("426") ? "" : (stryCov_9fa48("426"), "PUT"),
        params: stryMutAct_9fa48("427") ? {} : (stryCov_9fa48("427"), {
          code: commons.code
        }),
        data: stryMutAct_9fa48("428") ? {} : (stryCov_9fa48("428"), {
          name: commons.name,
          hasSackMeal: commons.hasSackMeal,
          hasTakeOutMeal: commons.hasTakeOutMeal,
          hasDiningCam: commons.hasDiningCam,
          latitude: commons.latitude,
          longitude: commons.longitude
        })
      });

      return objectToAxiosPutParams;
    })());

    const onSuccess = commons => {
      if (stryMutAct_9fa48("429")) {
        {}
      } else {
        stryCov_9fa48("429");
        toast(stryMutAct_9fa48("430") ? `` : (stryCov_9fa48("430"), `DiningCommons Updated - code: ${commons.code} name: ${commons.name}`));
      }
    };

    const mutation = useBackendMutation(objectToAxiosPutParams, stryMutAct_9fa48("431") ? {} : (stryCov_9fa48("431"), {
      onSuccess
    }), // Stryker disable next-line all : hard to set up test for caching
    [`/api/ucsbdiningcommons?code=${code}`]);
    const {
      isSuccess
    } = mutation;

    const onSubmit = async data => {
      if (stryMutAct_9fa48("434")) {
        {}
      } else {
        stryCov_9fa48("434");
        mutation.mutate(data);
      }
    };

    if (stryMutAct_9fa48("436") ? false : stryMutAct_9fa48("435") ? true : (stryCov_9fa48("435", "436"), isSuccess)) {
      if (stryMutAct_9fa48("437")) {
        {}
      } else {
        stryCov_9fa48("437");
        return <Navigate to="/diningCommons/list" />;
      }
    }

    return <BasicLayout>
      <div className="pt-2">
        <h1>Edit Dining Commons</h1>
        {stryMutAct_9fa48("440") ? commons || <DiningCommonsForm initialCommons={commons} submitAction={onSubmit} buttonLabel="Update" /> : stryMutAct_9fa48("439") ? false : stryMutAct_9fa48("438") ? true : (stryCov_9fa48("438", "439", "440"), commons && <DiningCommonsForm initialCommons={commons} submitAction={onSubmit} buttonLabel="Update" />)}
      </div>
    </BasicLayout>;
  }
}