import { useEffect } from "react";
import KeyFeatures from "../Info/KeyFeatures";
import Benefits from "../Info/Benefits";
import HowToOpenAccount from "../Info/HowToOpenAccount";
import {
  FaEnvelope,
  FaClipboardList,
  FaCreditCard,
  FaUserCheck,
} from "react-icons/fa";
import BackButton from "../../../UI/BackButton";
import { useNavigate } from "react-router-dom";
import PDAAccountsDropdown from "./PDAAccountsDropdown";

const PDAInfo = () => {
  const keyFeatures = [
    {
      title: "Convenient Deposit System",
      content: (
        <ul className="list-disc pl-5">
          <li>Deposit funds into your PDA account for easy purchases.</li>
          <li>No need to carry cash when buying philatelic products.</li>
          <li>Funds can be deposited at any participating post office.</li>
          <li>Enjoy a streamlined purchasing process with fewer hassles.</li>
        </ul>
      ),
    },
    {
      title: "Nationwide Accessibility",
      content: (
        <ul className="list-disc pl-5">
          <li>Access your PDA account from any post office in the country.</li>
          <li>Participate in philatelic events and promotions nationwide.</li>
          <li>Easy access to your account balance and statements.</li>
          <li>
            Support from a wide network of post offices offering philately
            services.
          </li>
        </ul>
      ),
    },
    {
      title: "Automatic Deduction",
      content: (
        <ul className="list-disc pl-5">
          <li>
            Charges for purchases are automatically deducted from your account.
          </li>
          <li>No need to manually handle payments for each purchase.</li>
          <li>Get notified of each transaction for better tracking.</li>
          <li>Ensures a seamless and quick checkout process.</li>
        </ul>
      ),
    },
    {
      title: "Exclusive Philatelic Offers",
      content: (
        <ul className="list-disc pl-5">
          <li>Access to rare and limited-edition stamps and collections.</li>
          <li>Receive special discounts exclusive to PDA account holders.</li>
          <li>Be the first to know about new philatelic releases.</li>
          <li>Invitations to exclusive philatelic events and exhibitions.</li>
        </ul>
      ),
    },
    {
      title: "Account Management Made Easy",
      content: (
        <ul className="list-disc pl-5">
          <li>
            Manage your account balance and transactions effortlessly at any
            Philatelic Bureau.
          </li>
          <li>
            Access your account information at designated post offices across
            the country.
          </li>
          <li>
            Keep track of deposits, purchases, and deliveries with regular
            statements.
          </li>
          <li>
            Get online updates for real-time account status and transaction
            history.
          </li>
        </ul>
      ),
    },
  ];

  const benefits = [
    "Hassle-free Purchasing: No need for frequent payments; simply use your prepaid balance",
    "Priority Access: Be the first to receive new and limited-edition stamps.",
    "Automatic record-keeping of purchases and deposits.",
    "Simplified purchase process at post offices.",
    "Exclusive promotions and offers for account holders.",
    "Nationwide access at participating post offices.",
    "Automatic Delivery: Ensure your collection is always up-to-date with automatic deliveries.",
  ];

  const steps = [
    {
      icon: <FaClipboardList />,
      title: "Step 1: Fill the Application Form",
      description: "Fill out the PDA account application form.",
    },
    {
      icon: <FaEnvelope />,
      title: "Step 2: Submit Required Documents",
      description:
        "Provide the necessary documents, including identification and address proof.",
    },
    {
      icon: <FaCreditCard />,
      title: "Step 3: Make an Initial Deposit",
      description:
        "Deposit the required minimum amount to activate your PDA account.",
    },
    {
      icon: <FaUserCheck />,
      title: "Step 4: Account Activation",
      description:
        "Your account will be activated, and you can start using it for philatelic purchases.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <BackButton />
      <div className="dark:bg-background-dark min-h-screen p-4 py-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center mb-8">
            <div className="flex-1 text-center">
              <h1 className="md:text-3xl text-xl mt-14 md:mt-0 font-bold text-primary-dark dark:text-white">
                National Philately Deposit Account (PDA)
              </h1>
            </div>
          </div>
          {/* <PDAAccountsDropdown /> */}
          <KeyFeatures features={keyFeatures} />
          <Benefits benefits={benefits} />
          <HowToOpenAccount steps={steps} />
        </div>
      </div>
      <button
        className="absolute top-5 right-5 bg-primary-dark text-white py-2 px-4 rounded-lg hover:opacity-90 transition ml-auto"
        onClick={() => navigate("/pda/create-account")}
      >
        Open PDA Account
      </button>
    </div>
  );
};

export default PDAInfo;
