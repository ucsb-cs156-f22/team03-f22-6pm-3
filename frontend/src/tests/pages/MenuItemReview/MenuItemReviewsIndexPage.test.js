import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewsIndexPage from "main/pages/MenuItemReviews/MenuItemReviewsIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
//import { MenuItemReviewFixtures } from "fixtures/MenuItemReviewFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("MenuItemReviewsIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const _testId = "MenuItemReviewsTable";

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
        axiosMock.onGet("/api/menuitemreview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });


    // test("renders three menuItemReviews without crashing for regular user", async () => {
    //     setupUserOnly();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/menuitemreview/all").reply(200, menuItemReviewsFixtures.threeCommons);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); } );
    //     expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
    //     expect(getByTestId(`${testId}-cell-row-2-col-code`)).toHaveTextContent("portola");

    // });

    // test("renders three menuItemReviews without crashing for admin user", async () => {
    //     setupAdminUser();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/menuitemreview/all").reply(200, menuItemReviewsFixtures.threeCommons);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); });
    //     expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
    //     expect(getByTestId(`${testId}-cell-row-2-col-code`)).toHaveTextContent("portola");

    // });

    // test("renders empty table when backend unavailable, user only", async () => {
    //     setupUserOnly();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/menuitemreview/all").timeout();

    //     const { queryByTestId, getByText } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

    //     const expectedHeaders = ['Code',  'Name', 'Sack Meal?','Takeout Meal?','Dining Cam?','Latitude','Longitude'];
    
    //     expectedHeaders.forEach((headerText) => {
    //       const header = getByText(headerText);
    //       expect(header).toBeInTheDocument();
    //     });

    //     expect(queryByTestId(`${testId}-cell-row-0-col-code`)).not.toBeInTheDocument();
    // });

    // test("test what happens when you click delete, admin", async () => {
    //     setupAdminUser();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/menuitemreview/all").reply(200, menuItemReviewsFixtures.threeCommons);
    //     axiosMock.onDelete("/api/menuitemreview", {params: {code: "de-la-guerra"}}).reply(200, "menuItemReviews with id de-la-guerra was deleted");


    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toBeInTheDocument(); });

    //    expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); 


    //     const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    //     expect(deleteButton).toBeInTheDocument();
       
    //     fireEvent.click(deleteButton);

    //     await waitFor(() => { expect(mockToast).toBeCalledWith("menuItemReviews with id de-la-guerra was deleted") });

    // });

    // test("test what happens when you click edit as an admin", async () => {
    //     setupAdminUser();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/menuitemreview/all").reply(200, menuItemReviewsFixtures.threeCommons);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toBeInTheDocument(); });

    //     expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); 


    //     const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    //     expect(editButton).toBeInTheDocument();
       
    //     fireEvent.click(editButton);

    //     await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/menuItemReviews/edit/de-la-guerra'));

    // });


});


