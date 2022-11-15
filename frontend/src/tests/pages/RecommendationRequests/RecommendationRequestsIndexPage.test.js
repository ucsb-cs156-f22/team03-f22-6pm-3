import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RecommendationRequestsIndexPage from "main/pages/RecommendationRequests/RecommendationRequestsIndexPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { RecommendationRequestsFixtures } from "fixtures/RecommendationRequestsFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";
// Fix Recommendation Info

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("RecommendationRequestsIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "RecommendationRequestsTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("Three Recommendations without crashing for user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").reply(200, RecommendationRequestsFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("pconrad@ucsb.edu"); } );
        expect(getByTestId(`${testId}-cell-row-1-col-requesterEmail`)).toHaveTextContent("jcucsb@ucsb.edu");
        expect(getByTestId(`${testId}-cell-row-2-col-requesterEmail`)).toHaveTextContent("thisisatest@gmail.com");

    });

    test("Three Recommendations without crashing for admin", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").reply(200, RecommendationRequestsFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-requesterEmail`)).toHaveTextContent("pconradb@ucsb.edu"); } );
        expect(getByTestId(`${testId}-cell-row-0-col-professorEmail`)).toHaveTextContent("josephcollins@ucsb.edu");
        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(getByTestId(`${testId}-cell-row-0-col-explanation`)).toHaveTextContent("Please work with me");
        expect(getByTestId(`${testId}-cell-row-0-col-dateRequested`)).toHaveTextContent("2022-01-02T12:00:00");
        expect(getByTestId(`${testId}-cell-row-0-col-dateNeeded`)).toHaveTextContent("2022-01-02T12:00:00");
        expect(getByTestId(`${testId}-cell-row-0-col-done`)).toHaveTextContent("false");
        expect(getByTestId(`${testId}-cell-row-1-col-requesterEmail`)).toHaveTextContent("pconrad@ucsb.edu");
        expect(getByTestId(`${testId}-cell-row-2-col-requesterEmail`)).toHaveTextContent("josephcollins@ucsb.edu");

    });

    test("renders empty table, backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").timeout();

        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

        const expectedHeaders = ['ID', 'Requester Email', 'Professor Email', 'Date Requested', 'Date Needed', 'Done'];

        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    test("click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/recommendationrequests/all").reply(200, RecommendationRequestsFixtures.threeRequests);
        axiosMock.onDelete("/api/recommendationrequests").reply(200, "RecommendationRequest with id 1 was deleted");

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 


        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("RecommendationRequest with id 1 was deleted") });

    });

});