// @ts-nocheck
import { useQuery } from "react-query";
import axios from "axios";

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
export function useSystemInfo() {
  if (stryMutAct_9fa48("571")) {
    {}
  } else {
    stryCov_9fa48("571");
    return useQuery(stryMutAct_9fa48("572") ? "" : (stryCov_9fa48("572"), "systemInfo"), async () => {
      if (stryMutAct_9fa48("573")) {
        {}
      } else {
        stryCov_9fa48("573");

        try {
          if (stryMutAct_9fa48("574")) {
            {}
          } else {
            stryCov_9fa48("574");
            const response = await axios.get(stryMutAct_9fa48("575") ? "" : (stryCov_9fa48("575"), "/api/systemInfo"));
            return response.data;
          }
        } catch (e) {
          if (stryMutAct_9fa48("576")) {
            {}
          } else {
            stryCov_9fa48("576");
            console.error(stryMutAct_9fa48("577") ? "" : (stryCov_9fa48("577"), "Error invoking axios.get: "), e);
            return stryMutAct_9fa48("578") ? {} : (stryCov_9fa48("578"), {
              springH2ConsoleEnabled: stryMutAct_9fa48("579") ? true : (stryCov_9fa48("579"), false),
              showSwaggerUILink: stryMutAct_9fa48("580") ? true : (stryCov_9fa48("580"), false)
            });
          }
        }
      }
    }, stryMutAct_9fa48("581") ? {} : (stryCov_9fa48("581"), {
      initialData: stryMutAct_9fa48("582") ? {} : (stryCov_9fa48("582"), {
        initialData: stryMutAct_9fa48("583") ? false : (stryCov_9fa48("583"), true),
        springH2ConsoleEnabled: stryMutAct_9fa48("584") ? true : (stryCov_9fa48("584"), false),
        showSwaggerUILink: stryMutAct_9fa48("585") ? true : (stryCov_9fa48("585"), false)
      })
    }));
  }
}