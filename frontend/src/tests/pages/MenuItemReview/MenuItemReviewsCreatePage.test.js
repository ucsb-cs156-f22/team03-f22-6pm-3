import { render, waitFor, fireEvent } from "@testing-library/react";
import MenuItemReviewsCreatePage from "main/pages/MenuItemReviews/MenuItemReviewsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

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
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("MenuItemReviewsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const menuItemReview = {
            id: 17,
            itemId: 3,
            reviewerEmail: "cgaucho@ucsb.edu",
            stars: 1,
            comments: "bad :(",
            dateReviewed: "2022-02-02T00:00",
        };

        axiosMock.onPost("/api/menuitemreview/post").reply( 202, menuItemReview );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("MenuItemReviewsForm-itemId")).toBeInTheDocument();
        });

        const itemIdField = getByTestId("MenuItemReviewsForm-itemId");
        const reviewerEmailField = getByTestId("MenuItemReviewsForm-reviewerEmail");
        const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");
        const starsField = getByTestId("MenuItemReviewsForm-stars");
        const commentsField = getByTestId("MenuItemReviewsForm-comments");
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(itemIdField, { target: { value: '3' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'cgaucho@ucsb.edu' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-02-02T00:00' } });
        fireEvent.change(starsField, { target: { value: '1' } });
        fireEvent.change(commentsField, { target: { value: 'bad :(' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                'itemId': '3',
                'reviewerEmail': 'cgaucho@ucsb.edu',
                'stars': '1',
                'comments': 'bad :(',
                'dateReviewed': '2022-02-02T00:00',
        });

        expect(mockToast).toBeCalledWith("New menuItemReview Created - id: 17 reviewerEmail: cgaucho@ucsb.edu");
        expect(mockNavigate).toBeCalledWith({ "to": "/menuItemReviews/list" });
    });


});


