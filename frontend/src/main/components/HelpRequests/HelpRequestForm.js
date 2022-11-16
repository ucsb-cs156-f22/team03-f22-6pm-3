import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function HelpRequestForm({ initialHelpRequest, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialHelpRequest || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialHelpRequest && (
                <Form.Group className="mb-3" >
                <Form.Label htmlFor="id">Request Id</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-id"
                    id="id"
                    type="text"
                    {...register("id")}
                    value={initialHelpRequest.id}
                    disabled
                />
            </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-requesterEmail"
                    id="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", {
                        required: "RequesterEmail is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="teamId">Team Id</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-teamId"
                    id="teamId"
                    type="text"
                    isInvalid={Boolean(errors.teamId)}
                    {...register("teamId", {
                        required: "TeamId is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.teamId?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="tableOrBreakoutRoom">Table Or Breakout Room</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-tableOrBreakoutRoom"
                    id="tableOrBreakoutRoom"
                    type="text"
                    isInvalid={Boolean(errors.tableOrBreakoutRoom)}
                    {...register("tableOrBreakoutRoom", {
                        required: "TableOrBreakoutRoom is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.tableOrBreakoutRoom?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requestTime">Request Time (iso format)</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-requestTime"
                    id="requestTime"
                    type="text"
                    isInvalid={Boolean(errors.requestTime)}
                    {...register("requestTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requestTime && 'RequestTime is required. '}
                    {errors.requestTime?.type === 'pattern' && 'RequestTime must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-explanation"
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                        required: "Explanation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="solved">Solved</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-solved"
                    id="solved"
                    type="text"
                    isInvalid={Boolean(errors.solved)}
                    {...register("solved", {
                        required: "Solved is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.solved?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="HelpRequestForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="HelpRequestForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default HelpRequestForm;
