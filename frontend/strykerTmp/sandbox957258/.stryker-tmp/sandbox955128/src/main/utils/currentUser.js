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

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function useCurrentUser() {
  if (stryMutAct_9fa48("522")) {
    {}
  } else {
    stryCov_9fa48("522");
    let rolesList = stryMutAct_9fa48("523") ? [] : (stryCov_9fa48("523"), [stryMutAct_9fa48("524") ? "" : (stryCov_9fa48("524"), "ERROR_GETTING_ROLES")]);
    return useQuery(stryMutAct_9fa48("525") ? "" : (stryCov_9fa48("525"), "current user"), async () => {
      if (stryMutAct_9fa48("526")) {
        {}
      } else {
        stryCov_9fa48("526");

        try {
          if (stryMutAct_9fa48("527")) {
            {}
          } else {
            stryCov_9fa48("527");
            const response = await axios.get(stryMutAct_9fa48("528") ? "" : (stryCov_9fa48("528"), "/api/currentUser"));

            try {
              if (stryMutAct_9fa48("529")) {
                {}
              } else {
                stryCov_9fa48("529");
                rolesList = response.data.roles.map(stryMutAct_9fa48("530") ? () => undefined : (stryCov_9fa48("530"), r => r.authority));
              }
            } catch (e) {
              if (stryMutAct_9fa48("531")) {
                {}
              } else {
                stryCov_9fa48("531");
                console.error(stryMutAct_9fa48("532") ? "" : (stryCov_9fa48("532"), "Error getting roles: "), e);
              }
            }

            response.data = stryMutAct_9fa48("533") ? {} : (stryCov_9fa48("533"), { ...response.data,
              rolesList: rolesList
            });
            return stryMutAct_9fa48("534") ? {} : (stryCov_9fa48("534"), {
              loggedIn: stryMutAct_9fa48("535") ? false : (stryCov_9fa48("535"), true),
              root: response.data
            });
          }
        } catch (e) {
          if (stryMutAct_9fa48("536")) {
            {}
          } else {
            stryCov_9fa48("536");
            console.error(stryMutAct_9fa48("537") ? "" : (stryCov_9fa48("537"), "Error invoking axios.get: "), e);
            return stryMutAct_9fa48("538") ? {} : (stryCov_9fa48("538"), {
              loggedIn: stryMutAct_9fa48("539") ? true : (stryCov_9fa48("539"), false),
              root: null
            });
          }
        }
      }
    }, stryMutAct_9fa48("540") ? {} : (stryCov_9fa48("540"), {
      initialData: stryMutAct_9fa48("541") ? {} : (stryCov_9fa48("541"), {
        loggedIn: stryMutAct_9fa48("542") ? true : (stryCov_9fa48("542"), false),
        root: null,
        initialData: stryMutAct_9fa48("543") ? false : (stryCov_9fa48("543"), true)
      })
    }));
  }
}
export function useLogout() {
  if (stryMutAct_9fa48("544")) {
    {}
  } else {
    stryCov_9fa48("544");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(async () => {
      if (stryMutAct_9fa48("545")) {
        {}
      } else {
        stryCov_9fa48("545");
        await axios.post(stryMutAct_9fa48("546") ? "" : (stryCov_9fa48("546"), "/logout"));
        await queryClient.resetQueries(stryMutAct_9fa48("547") ? "" : (stryCov_9fa48("547"), "current user"), stryMutAct_9fa48("548") ? {} : (stryCov_9fa48("548"), {
          exact: stryMutAct_9fa48("549") ? false : (stryCov_9fa48("549"), true)
        }));
        navigate(stryMutAct_9fa48("550") ? "" : (stryCov_9fa48("550"), "/"));
      }
    });
    return mutation;
  }
}
export function hasRole(currentUser, role) {
  if (stryMutAct_9fa48("551")) {
    {}
  } else {
    stryCov_9fa48("551");
    // The following hack is because there is some bug in terms of the
    // shape of the data returned by useCurrentUser.  Is there a separate 
    // data level, or not? 
    // We will file an issue to track that down and then remove this hack
    if (stryMutAct_9fa48("554") ? currentUser != null : stryMutAct_9fa48("553") ? false : stryMutAct_9fa48("552") ? true : (stryCov_9fa48("552", "553", "554"), currentUser == null)) return stryMutAct_9fa48("555") ? true : (stryCov_9fa48("555"), false);

    if (stryMutAct_9fa48("558") ? "data" in currentUser && "root" in currentUser.data && currentUser.data.root != null || "rolesList" in currentUser.data.root : stryMutAct_9fa48("557") ? false : stryMutAct_9fa48("556") ? true : (stryCov_9fa48("556", "557", "558"), (stryMutAct_9fa48("560") ? "data" in currentUser && "root" in currentUser.data || currentUser.data.root != null : stryMutAct_9fa48("559") ? true : (stryCov_9fa48("559", "560"), (stryMutAct_9fa48("562") ? "data" in currentUser || "root" in currentUser.data : stryMutAct_9fa48("561") ? true : (stryCov_9fa48("561", "562"), (stryMutAct_9fa48("563") ? "" : (stryCov_9fa48("563"), "data")) in currentUser && (stryMutAct_9fa48("564") ? "" : (stryCov_9fa48("564"), "root")) in currentUser.data)) && (stryMutAct_9fa48("566") ? currentUser.data.root == null : stryMutAct_9fa48("565") ? true : (stryCov_9fa48("565", "566"), currentUser.data.root != null)))) && (stryMutAct_9fa48("567") ? "" : (stryCov_9fa48("567"), "rolesList")) in currentUser.data.root)) {
      if (stryMutAct_9fa48("568")) {
        {}
      } else {
        stryCov_9fa48("568");
        return currentUser.data.root.rolesList.includes(role);
      }
    }

    return stryMutAct_9fa48("570") ? currentUser.root.rolesList?.includes(role) : stryMutAct_9fa48("569") ? currentUser.root?.rolesList.includes(role) : (stryCov_9fa48("569", "570"), currentUser.root?.rolesList?.includes(role));
  }
}