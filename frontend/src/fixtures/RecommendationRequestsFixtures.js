const RecommendationRequestsFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "josephcollins@ucsb.edu",
        "professorEmail": "pconrad@ucsb.edu",
        "explanation": "Need help on this team03",
        "dateRequested": "2022-01-02T12:00:00",
        "dateNeeded": "2022-01-02T12:00:00",
        "done": false,
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "josephcollins@ucsb.edu",
            "professorEmail": "pconrad@ucsb.edu",
            "explanation": "Hey how you doing",
            "dateRequested": "2022-01-02T12:00:00",
            "dateNeeded": "2022-01-02T12:00:00",
            "done": true,
        },
        {
            "id": 2,
            "requesterEmail": "pconrad@ucsb.edu",
            "professorEmail": "josephcollins@ucsb.edu",
            "explanation": "We should go get some Canes",
            "dateRequested": "2022-04-03T12:00:00",
            "dateNeeded": "2022-07-04T12:00:00",
            "done": false,
        },
        {
            "id": 3,
            "requesterEmail": "josephcollins@ucsb.edu",
            "professorEmail": "pconrad@ucsb.edu",
            "explanation": "Your TAs are the best",
            "dateRequested": "2022-07-04T12:00:00",
            "dateNeeded": "2022-08-04T12:00:00",
            "done": true,
        } 
    ]
};


export { RecommendationRequestsFixtures };