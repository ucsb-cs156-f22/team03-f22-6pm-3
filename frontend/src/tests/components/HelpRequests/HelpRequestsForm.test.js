import { render, waitFor, fireEvent } from "@testing-library/react";
import HelpRequestForm from "main/components/HelpRequests/HelpRequestForm";
import { helpRequestsFixtures } from "fixtures/helpRequestsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("HelpRequestForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Requester Email/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a UCSBDate ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <HelpRequestForm initialHelpRequest ={helpRequestsFixtures.oneHelpRequest} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/HelpRequestForm-id/)).toBeInTheDocument());
        expect(getByText(/Request Id/)).toBeInTheDocument();
        expect(getByTestId(/HelpRequestForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("HelpRequestForm-requesterEmail")).toBeInTheDocument());
        const requestTimeField = getByTestId("HelpRequestForm-requestTime");
        const submitButton = getByTestId("HelpRequestForm-submit");

        fireEvent.change(requestTimeField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/RequestTime must be in ISO format, e.g. 2022-01-02T15:30/)).toBeInTheDocument());
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("HelpRequestForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("HelpRequestForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/RequesterEmail is required./)).toBeInTheDocument());
        expect(getByText(/TeamId is required./)).toBeInTheDocument();
        expect(getByText(/TableOrBreakoutRoom is required./)).toBeInTheDocument();
        expect(getByText(/RequestTime is required./)).toBeInTheDocument();
        expect(getByText(/Explanation is required./)).toBeInTheDocument();
        expect(getByText(/Solved is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <HelpRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("HelpRequestForm-requesterEmail")).toBeInTheDocument());

        const requesterEmailField = getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = getByTestId("HelpRequestForm-teamId");
        const tableOrBreakoutRoomField = getByTestId("HelpRequestForm-tableOrBreakoutRoom");
        const requestTimeField = getByTestId("HelpRequestForm-requestTime");
        const explanationField = getByTestId("HelpRequestForm-explanation");
        const solvedField = getByTestId("HelpRequestForm-solved");
        const submitButton = getByTestId("HelpRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'someperson@someemail.com' } });
        fireEvent.change(teamIdField, { target: { value: 'f22-10pm-3' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'table 4' } });
        fireEvent.change(requestTimeField, { target: { value: '2022-11-10T05:24:00' } });
        fireEvent.change(explanationField, { target: { value: 'Need help with Swagger UI.' } });
        fireEvent.change(solvedField, { target: { value: false } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/RequestTime must be in ISO format, e.g. 2022-01-02T15:30/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("HelpRequestForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("HelpRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


