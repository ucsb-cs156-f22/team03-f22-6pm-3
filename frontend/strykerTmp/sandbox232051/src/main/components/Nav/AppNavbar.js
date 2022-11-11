// @ts-nocheck
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";

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
export default function AppNavbar({
  currentUser,
  systemInfo,
  doLogout,
  currentUrl = window.location.href
}) {
  if (stryMutAct_9fa48("145")) {
    {}
  } else {
    stryCov_9fa48("145");
    return <>
      {stryMutAct_9fa48("148") ? currentUrl.startsWith("http://localhost:3000") || currentUrl.startsWith("http://127.0.0.1:3000") || <AppNavbarLocalhost url={currentUrl} /> : stryMutAct_9fa48("147") ? false : stryMutAct_9fa48("146") ? true : (stryCov_9fa48("146", "147", "148"), (stryMutAct_9fa48("150") ? currentUrl.startsWith("http://localhost:3000") && currentUrl.startsWith("http://127.0.0.1:3000") : stryMutAct_9fa48("149") ? true : (stryCov_9fa48("149", "150"), currentUrl.startsWith(stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), "http://localhost:3000")) || currentUrl.startsWith(stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "http://127.0.0.1:3000")))) && <AppNavbarLocalhost url={currentUrl} />)}
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {
              /* be sure that each NavDropdown has a unique id and data-testid */
            }
          </>

          <Navbar.Collapse>
            {
              /* This `nav` component contains all navigation items that show up on the left side */
            }
            <Nav className="me-auto">
              {stryMutAct_9fa48("155") ? systemInfo?.springH2ConsoleEnabled || <>
                    <Nav.Link href="/h2-console">H2Console</Nav.Link>
                  </> : stryMutAct_9fa48("154") ? false : stryMutAct_9fa48("153") ? true : (stryCov_9fa48("153", "154", "155"), (stryMutAct_9fa48("156") ? systemInfo.springH2ConsoleEnabled : (stryCov_9fa48("156"), systemInfo?.springH2ConsoleEnabled)) && <>
                    <Nav.Link href="/h2-console">H2Console</Nav.Link>
                  </>)}
              {stryMutAct_9fa48("159") ? systemInfo?.showSwaggerUILink || <>
                    <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                  </> : stryMutAct_9fa48("158") ? false : stryMutAct_9fa48("157") ? true : (stryCov_9fa48("157", "158", "159"), (stryMutAct_9fa48("160") ? systemInfo.showSwaggerUILink : (stryCov_9fa48("160"), systemInfo?.showSwaggerUILink)) && <>
                    <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                  </>)}
              {stryMutAct_9fa48("163") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("162") ? false : stryMutAct_9fa48("161") ? true : (stryCov_9fa48("161", "162", "163"), hasRole(currentUser, stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "ROLE_ADMIN")) && <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown>)}
              {stryMutAct_9fa48("167") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown">
                    <NavDropdown.Item as={Link} to="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("166") ? false : stryMutAct_9fa48("165") ? true : (stryCov_9fa48("165", "166", "167"), hasRole(currentUser, stryMutAct_9fa48("168") ? "" : (stryCov_9fa48("168"), "ROLE_USER")) && <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown">
                    <NavDropdown.Item as={Link} to="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown>)}
               {stryMutAct_9fa48("171") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Dining Commons" id="appnavbar-dining-commons-dropdown" data-testid="appnavbar-dining-commons-dropdown">
                    <NavDropdown.Item as={Link} to="/diningCommons/list" data-testid="appnavbar-dining-commons-list">List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/diningCommons/create" data-testid="appnavbar-dining-commons-create">Create</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("170") ? false : stryMutAct_9fa48("169") ? true : (stryCov_9fa48("169", "170", "171"), hasRole(currentUser, stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), "ROLE_USER")) && <NavDropdown title="Dining Commons" id="appnavbar-dining-commons-dropdown" data-testid="appnavbar-dining-commons-dropdown">
                    <NavDropdown.Item as={Link} to="/diningCommons/list" data-testid="appnavbar-dining-commons-list">List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/diningCommons/create" data-testid="appnavbar-dining-commons-create">Create</NavDropdown.Item>
                  </NavDropdown>)}
              {stryMutAct_9fa48("175") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown">
                    <NavDropdown.Item as={Link} to="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("174") ? false : stryMutAct_9fa48("173") ? true : (stryCov_9fa48("173", "174", "175"), hasRole(currentUser, stryMutAct_9fa48("176") ? "" : (stryCov_9fa48("176"), "ROLE_USER")) && <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown">
                    <NavDropdown.Item as={Link} to="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("179") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item> : stryMutAct_9fa48("178") ? false : stryMutAct_9fa48("177") ? true : (stryCov_9fa48("177", "178", "179"), hasRole(currentUser, stryMutAct_9fa48("180") ? "" : (stryCov_9fa48("180"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
              {stryMutAct_9fa48("183") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Organization" id="appnavbar-organizations-dropdown" data-testid="appnavbar-organizations-dropdown">
                    <NavDropdown.Item as={Link} to="/organizations/list" data-testid="appnavbar-organizations-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/organizations/create" data-testid="appnavbar-organizations-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("182") ? false : stryMutAct_9fa48("181") ? true : (stryCov_9fa48("181", "182", "183"), hasRole(currentUser, stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), "ROLE_USER")) && <NavDropdown title="Organization" id="appnavbar-organizations-dropdown" data-testid="appnavbar-organizations-dropdown">
                    <NavDropdown.Item as={Link} to="/organizations/list" data-testid="appnavbar-organizations-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("187") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/organizations/create" data-testid="appnavbar-organizations-create">Create</NavDropdown.Item> : stryMutAct_9fa48("186") ? false : stryMutAct_9fa48("185") ? true : (stryCov_9fa48("185", "186", "187"), hasRole(currentUser, stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/organizations/create" data-testid="appnavbar-organizations-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
              {stryMutAct_9fa48("191") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Menu Items" id="appnavbar-menuitems-dropdown" data-testid="appnavbar-menuitems-dropdown">
                    <NavDropdown.Item as={Link} to="/menuitems/list" data-testid="appnavbar-menuitems-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/menuitems/create" data-testid="appnavbar-menuitems-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("190") ? false : stryMutAct_9fa48("189") ? true : (stryCov_9fa48("189", "190", "191"), hasRole(currentUser, stryMutAct_9fa48("192") ? "" : (stryCov_9fa48("192"), "ROLE_USER")) && <NavDropdown title="Menu Items" id="appnavbar-menuitems-dropdown" data-testid="appnavbar-menuitems-dropdown">
                    <NavDropdown.Item as={Link} to="/menuitems/list" data-testid="appnavbar-menuitems-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("195") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/menuitems/create" data-testid="appnavbar-menuitems-create">Create</NavDropdown.Item> : stryMutAct_9fa48("194") ? false : stryMutAct_9fa48("193") ? true : (stryCov_9fa48("193", "194", "195"), hasRole(currentUser, stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/menuitems/create" data-testid="appnavbar-menuitems-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
               {stryMutAct_9fa48("199") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Recommendations" id="appnavbar-recommendations-dropdown" data-testid="appnavbar-recommendations-dropdown">
                    <NavDropdown.Item as={Link} to="/recommendations/list" data-testid="appnavbar-recommendations-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/recommendations/create" data-testid="appnavbar-recommendations-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("198") ? false : stryMutAct_9fa48("197") ? true : (stryCov_9fa48("197", "198", "199"), hasRole(currentUser, stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), "ROLE_USER")) && <NavDropdown title="Recommendations" id="appnavbar-recommendations-dropdown" data-testid="appnavbar-recommendations-dropdown">
                    <NavDropdown.Item as={Link} to="/recommendations/list" data-testid="appnavbar-recommendations-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("203") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/recommendations/create" data-testid="appnavbar-recommendations-create">Create</NavDropdown.Item> : stryMutAct_9fa48("202") ? false : stryMutAct_9fa48("201") ? true : (stryCov_9fa48("201", "202", "203"), hasRole(currentUser, stryMutAct_9fa48("204") ? "" : (stryCov_9fa48("204"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/recommendations/create" data-testid="appnavbar-recommendations-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
              {stryMutAct_9fa48("207") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Reviews" id="appnavbar-reviews-dropdown" data-testid="appnavbar-reviews-dropdown">
                    <NavDropdown.Item as={Link} to="/reviews/list" data-testid="appnavbar-reviews-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/reviews/create" data-testid="appnavbar-reviews-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("206") ? false : stryMutAct_9fa48("205") ? true : (stryCov_9fa48("205", "206", "207"), hasRole(currentUser, stryMutAct_9fa48("208") ? "" : (stryCov_9fa48("208"), "ROLE_USER")) && <NavDropdown title="Reviews" id="appnavbar-reviews-dropdown" data-testid="appnavbar-reviews-dropdown">
                    <NavDropdown.Item as={Link} to="/reviews/list" data-testid="appnavbar-reviews-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("211") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/reviews/create" data-testid="appnavbar-reviews-create">Create</NavDropdown.Item> : stryMutAct_9fa48("210") ? false : stryMutAct_9fa48("209") ? true : (stryCov_9fa48("209", "210", "211"), hasRole(currentUser, stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/reviews/create" data-testid="appnavbar-reviews-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
              {stryMutAct_9fa48("215") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Help Requests" id="appnavbar-helprequests-dropdown" data-testid="appnavbar-helprequests-dropdown">
                    <NavDropdown.Item as={Link} to="/helprequests/list" data-testid="appnavbar-helprequests-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/helprequests/create" data-testid="appnavbar-helprequests-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("214") ? false : stryMutAct_9fa48("213") ? true : (stryCov_9fa48("213", "214", "215"), hasRole(currentUser, stryMutAct_9fa48("216") ? "" : (stryCov_9fa48("216"), "ROLE_USER")) && <NavDropdown title="Help Requests" id="appnavbar-helprequests-dropdown" data-testid="appnavbar-helprequests-dropdown">
                    <NavDropdown.Item as={Link} to="/helprequests/list" data-testid="appnavbar-helprequests-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("219") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/helprequests/create" data-testid="appnavbar-helprequests-create">Create</NavDropdown.Item> : stryMutAct_9fa48("218") ? false : stryMutAct_9fa48("217") ? true : (stryCov_9fa48("217", "218", "219"), hasRole(currentUser, stryMutAct_9fa48("220") ? "" : (stryCov_9fa48("220"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/helprequests/create" data-testid="appnavbar-helprequests-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
              {stryMutAct_9fa48("223") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Articles" id="appnavbar-articles-dropdown" data-testid="appnavbar-articles-dropdown">
                    <NavDropdown.Item as={Link} to="/articles/list" data-testid="appnavbar-articles-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item as={Link} to="/articles/create" data-testid="appnavbar-articles-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("222") ? false : stryMutAct_9fa48("221") ? true : (stryCov_9fa48("221", "222", "223"), hasRole(currentUser, stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), "ROLE_USER")) && <NavDropdown title="Articles" id="appnavbar-articles-dropdown" data-testid="appnavbar-articles-dropdown">
                    <NavDropdown.Item as={Link} to="/articles/list" data-testid="appnavbar-articles-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("227") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item as={Link} to="/articles/create" data-testid="appnavbar-articles-create">Create</NavDropdown.Item> : stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226", "227"), hasRole(currentUser, stryMutAct_9fa48("228") ? "" : (stryCov_9fa48("228"), "ROLE_ADMIN")) && <NavDropdown.Item as={Link} to="/articles/create" data-testid="appnavbar-articles-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
                
            </Nav>

            <Nav className="ml-auto">
              {
                /* This `nav` component contains all navigation items that show up on the right side */
              }
              {(stryMutAct_9fa48("231") ? currentUser || currentUser.loggedIn : stryMutAct_9fa48("230") ? false : stryMutAct_9fa48("229") ? true : (stryCov_9fa48("229", "230", "231"), currentUser && currentUser.loggedIn)) ? <>
                    <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                    <Button onClick={doLogout}>Log Out</Button>
                  </> : <Button href="/oauth2/authorization/google">Log In</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>;
  }
}