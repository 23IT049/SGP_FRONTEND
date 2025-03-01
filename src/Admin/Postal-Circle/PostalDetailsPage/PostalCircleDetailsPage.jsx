import { usePostalCircle } from "../../../context/PostalCircleContext";
import { useParams } from "react-router-dom";
import BackButton from "../../../UI/BackButton";
import StatsGraphs from "../../Dashboard/Stats/StatsGraph";

function PostalCircleDetailsPage() {
  const { id } = useParams();
  const { postalCircles } = usePostalCircle();

  const postalCircle = postalCircles.find(
    (circle) => String(circle.unique_id) === String(id)
  );

  if (!postalCircle) {
    return <div className="text-center p-4">Postal Circle not found.</div>;
  }

  const { name, email, region, state, address, bankDetails } = postalCircle;

  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold text-primary-dark dark:text-text-dark mb-3">
          {name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          <div className="bg-white dark:bg-background-dark dark:border-border-dark dark:border dark:text-gray-200 dark:shadow-md dark:shadow-shadow-dark shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">General Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Postal Circle Name:</span>{" "}
                {name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {email || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {region || "N/A"}
              </p>
              <p>
                <span className="font-semibold">State:</span> {state}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-background-dark dark:border-border-dark dark:border dark:text-gray-200 dark:shadow-md dark:shadow-shadow-dark shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Address</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Street:</span>{" "}
                {address?.street || "N/A"}
              </p>
              <p>
                <span className="font-semibold">City:</span>{" "}
                {address?.city || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{" "}
                {address?.pincode || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-background-dark dark:border-border-dark dark:border dark:text-gray-200 dark:shadow-md dark:shadow-shadow-dark shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Bank Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Account Number:</span>{" "}
                {bankDetails?.accountNumber || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Bank Name:</span>{" "}
                {bankDetails?.bankName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Total Revenue:</span>{" "}
                {bankDetails?.totalRevenue || "N/A"}
              </p>
              <p>
                <span className="font-semibold">IFSC Code:</span>{" "}
                {bankDetails?.ifscCode || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Branch Name:</span>{" "}
                {bankDetails?.branchName || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <StatsGraphs />
      </div>
    </div>
  );
}

export default PostalCircleDetailsPage;
