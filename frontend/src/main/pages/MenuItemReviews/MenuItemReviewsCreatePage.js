import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function MenuItemReviewsCreatePage() {

  const objectToAxiosParams = (menuItemReview) => ({
    url: "/api/menuitemreview/post",
    method: "POST",
    params: {
      itemId: menuItemReview.itemId,
      reviewerEmail: menuItemReview.reviewerEmail,
      dateReviewed: menuItemReview.dateReviewed,
      stars: menuItemReview.stars,
      comments: menuItemReview.comments,
    }
  });

  const onSuccess = (menuItemReview) => {
    toast(`New menuItemReview Created - id: ${menuItemReview.id} reviewerEmail: ${menuItemReview.reviewerEmail}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/menuitemreview/all"]
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
        <h1>Create New Menu Item Review</h1>

        <MenuItemReviewsForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}