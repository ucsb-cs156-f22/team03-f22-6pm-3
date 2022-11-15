import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function MenuItemReviewsEditPage() {
  let { id } = useParams();

  const { data: menuItemReview, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/menuitemreview?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/menuitemreview`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (menuItemReview) => ({
    url: "/api/menuitemreview",
    method: "PUT",
    params: {
      id: menuItemReview.id,
    },
    data: {
      itemId: menuItemReview.itemId,
      reviewerEmail: menuItemReview.reviewerEmail,
      dateReviewed: menuItemReview.dateReviewed,
      stars: menuItemReview.stars,
      comments: menuItemReview.comments,
    }
  });

  const onSuccess = (menuItemReview) => {
    toast(`MenuItem Review Updated - id: ${menuItemReview.id} Reviewer Email: ${menuItemReview.reviewerEmail}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/menuitemreview?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/menuItemReviews/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit MenuItem Review</h1>
        {menuItemReview &&
          <MenuItemReviewsForm initialMenuItemReview={menuItemReview} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

