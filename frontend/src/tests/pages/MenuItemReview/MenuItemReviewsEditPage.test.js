import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewsEditPage from "main/pages/MenuItemReviews/MenuItemReviewsEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("MenuItemReviewsEditPage tests", () => {

    describe("when the backend doesn't return a review", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit MenuItem Review")).toBeInTheDocument());
            expect(queryByTestId("MenuItemReviewsForm-itemId")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { id: 17 } }).reply(200, {
                id: 17,
                itemId: 3,
                reviewerEmail: "cgaucho@ucsb.edu",
                stars: 1,
                comments: "bad :(",
                dateReviewed: "2022-02-02T00:00",
            });
            axiosMock.onPut('/api/menuitemreview').reply(200, {
                id: 17,
                itemId: 2,
                reviewerEmail: "jev@ucsb.edu",
                stars: 5,
                comments: "good :)",
                dateReviewed: "2022-03-02T00:00",
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("MenuItemReviewsForm-itemId")).toBeInTheDocument());

            const idField = getByTestId("MenuItemReviewsForm-id");
            const itemIdField = getByTestId("MenuItemReviewsForm-itemId");
            const reviewerEmailField = getByTestId("MenuItemReviewsForm-reviewerEmail");
            const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");
            const starsField = getByTestId("MenuItemReviewsForm-stars");
            const commentsField = getByTestId("MenuItemReviewsForm-comments");

            expect(idField).toHaveValue("17");
            expect(itemIdField).toHaveValue("3");
            expect(reviewerEmailField).toHaveValue("cgaucho@ucsb.edu");
            expect(dateReviewedField).toHaveValue("2022-02-02T00:00");
            expect(starsField).toHaveValue("1");
            expect(commentsField).toHaveValue("bad :(");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("MenuItemReviewsForm-itemId")).toBeInTheDocument());

            const idField = getByTestId("MenuItemReviewsForm-id");
            const itemIdField = getByTestId("MenuItemReviewsForm-itemId");
            const reviewerEmailField = getByTestId("MenuItemReviewsForm-reviewerEmail");
            const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");
            const starsField = getByTestId("MenuItemReviewsForm-stars");
            const commentsField = getByTestId("MenuItemReviewsForm-comments");
            const submitButton = getByTestId("MenuItemReviewsForm-submit")

            expect(idField).toHaveValue("17");
            expect(itemIdField).toHaveValue("3");
            expect(reviewerEmailField).toHaveValue("cgaucho@ucsb.edu");
            expect(dateReviewedField).toHaveValue("2022-02-02T00:00");
            expect(starsField).toHaveValue("1");
            expect(commentsField).toHaveValue("bad :(");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(itemIdField, { target: { value: '2' } })
            fireEvent.change(reviewerEmailField, { target: { value: 'jev@ucsb.edu' } })
            fireEvent.change(dateReviewedField, { target: { value: "2022-03-02T00:00" } })
            fireEvent.change(starsField, { target: { value: "5" } })
            fireEvent.change(commentsField, { target: { value: "good :)" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("MenuItem Review Updated - id: 17 Reviewer Email: jev@ucsb.edu");
            expect(mockNavigate).toBeCalledWith({ "to": "/menuItemReviews/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                'itemId': '2',
                'reviewerEmail': "jev@ucsb.edu",
                'dateReviewed': "2022-03-02T00:00",
                'stars': '5',
                'comments': "good :)",
                
            })); // posted object

        });

       
    });
});


