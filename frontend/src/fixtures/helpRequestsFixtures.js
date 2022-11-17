const helpRequestsFixtures = {
    oneHelpRequest: {
        "id": 1,
        "requesterEmail": "someperson@someemail.com",
        "teamId": "f22-10pm-3",
        "tableOrBreakoutRoom": "table 4",
        "requestTime": "2022-11-10T05:24:00",
        "explanation": "Need help with Swagger UI.",
        "solved": false
    },
    threeHelpRequests: [
        {
            "id": 1,
            "requesterEmail": "someperson@someemail.com",
            "teamId": "f22-10pm-3",
            "tableOrBreakoutRoom": "table 4",
            "requestTime": "2022-11-10T05:24:00",
            "explanation": "Need help with Swagger UI.",
            "solved": false
        },
        {
            "id": 2,
            "requesterEmail": "otherperson@someemail.com",
            "teamId": "f22-3pm-2",
            "tableOrBreakoutRoom": "table 11",
            "requestTime": "2022-11-05T06:10:00",
            "explanation": "Stryker timing out after running for 40 minutes.",
            "solved": false
        },
        {
            "id": 3,
            "requesterEmail": "oopsieperson@weirdemail.com",
            "teamId": "f22-12pm-1",
            "tableOrBreakoutRoom": "table 3",
            "requestTime": "2021-08-12T01:00:00",
            "explanation": "My whole github repo was deleted!!!!!",
            "solved": true
        }
    ]
};


export { helpRequestsFixtures };