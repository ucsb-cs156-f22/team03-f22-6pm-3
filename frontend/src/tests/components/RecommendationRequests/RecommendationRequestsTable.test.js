import {  render } from "@testing-library/react";
import { RecommendationRequestsFixtures } from "fixtures/RecommendationRequestsFixtures";
import RecommendationRequestsTable from "main/components/RecommendationRequests/RecommendationRequestsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { cellToAxiosParamsDelete } from "main/components/RecommendationRequests/RecommendationRequestsTable";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RecommendationRequestsTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestsTable recommendations={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestsTable recommendations={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestsTable recommendations={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestsTable recommendations={RecommendationRequestsFixtures.threeRecommendations} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["Id", "RequesterEmail", "ProfessorEmail", "DateRequested", 'Explanation', 'DateNeeded', 'Done?'];
    const expectedFields = ["id", "requesterEmail", "professorEmail", "dateRequested", 'explanation', 'dateNeeded', 'done'];
    const testId = "RecommendationRequestsTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

    // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    // expect(editButton).toBeInTheDocument();
    // expect(editButton).toHaveClass("btn-primary");

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    expect(getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("requesterEmail1");
    expect(getByTestId(`${testId}-cell-row-1-col-requesterEmail`)).toHaveTextContent("requesterEmail2");
    expect(getByTestId(`${testId}-cell-row-0-col-professorEmail`)).toHaveTextContent("professorEmail1");
    expect(getByTestId(`${testId}-cell-row-1-col-professorEmail`)).toHaveTextContent("professorEmail2");
    expect(getByTestId(`${testId}-cell-row-0-col-dateRequested`)).toHaveTextContent("2022-11-13T00:00:00");
    expect(getByTestId(`${testId}-cell-row-1-col-dateRequested`)).toHaveTextContent("2022-11-13T00:00:00");
    expect(getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("explanation1");
    expect(getByTestId(`${testId}-cell-row-1-col-explanation`)).toHaveTextContent("explanation2");
    expect(getByTestId(`${testId}-cell-row-0-col-dateNeeded`)).toHaveTextContent("2022-11-14T00:00:00");
    expect(getByTestId(`${testId}-cell-row-1-col-dateNeeded`)).toHaveTextContent("2022-11-14T00:00:00");
    expect(getByTestId(`${testId}-cell-row-0-col-done`)).toHaveTextContent(false);
    expect(getByTestId(`${testId}-cell-row-1-col-done`)).toHaveTextContent(false);

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("test for correct parameters", () => {
    const entry = { row: { values: { id: 5 } } };
    const result = cellToAxiosParamsDelete(entry);
    expect(result).toEqual({
      url: "/api/recommendationrequests",
      method: "DELETE",
      params: { id: 5 }
    });
  });



});
