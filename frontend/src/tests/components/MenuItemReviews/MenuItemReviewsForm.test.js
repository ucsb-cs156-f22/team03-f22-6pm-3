import { render, waitFor, fireEvent } from "@testing-library/react";
import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { menuItemReviewsFixtures } from "fixtures/menuItemReviewsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("MenuItemReviewsForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Item ID/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a MenuItemReview ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <MenuItemReviewsForm initialMenuItemReview={menuItemReviewsFixtures.oneReview[0]} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/MenuItemReviewsForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/MenuItemReviewsForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-itemId")).toBeInTheDocument());
        const itemId = getByTestId("MenuItemReviewsForm-itemId");
        const dateReviewed = getByTestId("MenuItemReviewsForm-dateReviewed");
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(itemId, { target: { value: 'bad-input' } });
        fireEvent.change(dateReviewed, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/itemId must be in the form of a number/)).toBeInTheDocument());
        expect(getByText(/dateReviewed must be in ISO format/)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/itemId is required./)).toBeInTheDocument());
        expect(getByText(/Reviewer Email is required./)).toBeInTheDocument();
        expect(getByText(/dateReviewed is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <MenuItemReviewsForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-itemId")).toBeInTheDocument());

        const itemIdField = getByTestId("MenuItemReviewsForm-itemId");
        const reviewedEmailField = getByTestId("MenuItemReviewsForm-reviewerEmail");
        const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");
        const starsField = getByTestId("MenuItemReviewsForm-stars");
        const commentsField = getByTestId("MenuItemReviewsForm-comments");
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(itemIdField, { target: { value: '3' } });
        fireEvent.change(reviewedEmailField, { target: { value: 'gaucho@ucsb.edu' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(starsField, { target: { value: '0' } });
        fireEvent.change(commentsField, { target: { value: 'WACK FOOD!!!!' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/itemId must be in the form of a number/)).not.toBeInTheDocument();
        expect(queryByText(/dateReviewed must be in ISO format/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("MenuItemReviewsForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


