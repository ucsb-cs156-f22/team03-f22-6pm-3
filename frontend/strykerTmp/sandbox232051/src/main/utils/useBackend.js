// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

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
} // example
//  queryKey ["/api/users/all"] for "api/users/all"
//  queryKey ["/api/users","4"]  for "/api/users?id=4"
// For axiosParameters
//   
// {
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//  }
// 
// GET Example:
// useBackend(
//     ["/api/admin/users"],
//     { method: "GET", url: "/api/admin/users" },
//     []
// );

export function useBackend(queryKey, axiosParameters, initialData) {
  if (stryMutAct_9fa48("586")) {
    {}
  } else {
    stryCov_9fa48("586");
    return useQuery(queryKey, async () => {
      if (stryMutAct_9fa48("587")) {
        {}
      } else {
        stryCov_9fa48("587");

        try {
          if (stryMutAct_9fa48("588")) {
            {}
          } else {
            stryCov_9fa48("588");
            const response = await axios(axiosParameters);
            return response.data;
          }
        } catch (e) {
          if (stryMutAct_9fa48("589")) {
            {}
          } else {
            stryCov_9fa48("589");

            // Stryker disable next-line OptionalChaining
            if (stryMutAct_9fa48("591") ? false : stryMutAct_9fa48("590") ? true : (stryCov_9fa48("590", "591"), e.response?.data?.message)) {
              if (stryMutAct_9fa48("594")) {
                {}
              } else {
                stryCov_9fa48("594");
                toast.error(e.response.data.message);
              }
            } else {
              if (stryMutAct_9fa48("595")) {
                {}
              } else {
                stryCov_9fa48("595");
                const errorMessage = stryMutAct_9fa48("596") ? `` : (stryCov_9fa48("596"), `Error communicating with backend via ${axiosParameters.method} on ${axiosParameters.url}`);
                toast.error(errorMessage);
              }
            }

            throw e;
          }
        }
      }
    }, stryMutAct_9fa48("597") ? {} : (stryCov_9fa48("597"), {
      initialData
    }));
  }
}

const wrappedParams = async params => {
  if (stryMutAct_9fa48("598")) {
    {}
  } else {
    stryCov_9fa48("598");
    return await (await axios(params)).data;
  }
};

export function useBackendMutation(objectToAxiosParams, useMutationParams, queryKey = null) {
  if (stryMutAct_9fa48("599")) {
    {}
  } else {
    stryCov_9fa48("599");
    const queryClient = useQueryClient();
    return useMutation(stryMutAct_9fa48("600") ? () => undefined : (stryCov_9fa48("600"), object => wrappedParams(objectToAxiosParams(object))), stryMutAct_9fa48("601") ? {} : (stryCov_9fa48("601"), {
      onError: error => {
        if (stryMutAct_9fa48("602")) {
          {}
        } else {
          stryCov_9fa48("602");

          // Stryker disable next-line OptionalChaining : we want to check if each nested object is there but we dont want to write tests for each specific case
          if (stryMutAct_9fa48("604") ? false : stryMutAct_9fa48("603") ? true : (stryCov_9fa48("603", "604"), error.response?.data?.message)) {
            if (stryMutAct_9fa48("607")) {
              {}
            } else {
              stryCov_9fa48("607");
              toast.error(error.response.data.message);
            }
          } else {
            if (stryMutAct_9fa48("608")) {
              {}
            } else {
              stryCov_9fa48("608");
              const errorMessage = stryMutAct_9fa48("609") ? `` : (stryCov_9fa48("609"), `Error communicating with backend via ${error.response.config.method} on ${error.response.config.url}`);
              toast.error(errorMessage);
            }
          }
        }
      },
      // Stryker disable all: Not sure how to set up the complex behavior needed to test this
      onSettled: () => {
        if (queryKey !== null) queryClient.invalidateQueries(queryKey);
      },
      // Stryker enable all
      retry: false,
      ...useMutationParams
    }));
  }
}