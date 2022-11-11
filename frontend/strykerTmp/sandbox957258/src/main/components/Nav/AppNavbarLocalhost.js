// @ts-nocheck
import { Container, Nav, Navbar } from "react-bootstrap";

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
export default function AppNavbarLocalhost({
  url
}) {
  if (stryMutAct_9fa48("232")) {
    {}
  } else {
    stryCov_9fa48("232");
    return <>
      <Navbar expand="sm" bg="warning" sticky="top" data-testid="AppNavbarLocalhost">
        <Container>
          <Navbar.Brand href="http://localhost:8080">
            Warning
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-between">

            <Nav className="mr-auto text-center">
              <Nav.Item className="text-center">
                <p>
                  Running on <code>{url}</code> with no backend.<br />
                  You probably want <a href="http://localhost:8080">http://localhost:8080</a> instead.
                </p>
              </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>;
  }
}