import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PDAForm from "../UpdatePDA/UpdatePDAForm";
import axios from "axios";

const PDAAccountsDropdown = () => {
  const [expanded, setExpanded] = useState(null);
  const [updatingAccount, setUpdatingAccount] = useState(null); 
  const [accounts, setAccounts] = useState([]); 

  // console.log(currUser)

  const token = localStorage.getItem("token");

  const fetchPDA = () => {
    axios
      .get(`http://localhost:5000/api/pda/pdaitems`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data.pdaDetails)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPDA();
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="w-full mx-auto my-10">
      <h2 className="text-2xl text-center font-semibold dark:text-text-dark mb-4">
        My PDA Accounts
      </h2>
      {!updatingAccount ? (
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-shadow-dark overflow-hidden">
          {accounts.map((account, index) => (
            <div
              key={account._id} 
              className="border-b border-border-light dark:border-border-dark"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left dark:text-text-dark font-medium hover:bg-primary-dark"
                onClick={() => toggleExpand(index)}
              >
                <span>Postal Circle : {account.postal_circle.name || `Account ${index + 1}`}</span>
                {expanded === index ? (
                  <FaChevronUp className="dark:text-accent-dark" />
                ) : (
                  <FaChevronDown className="dark:text-accent-dark" />
                )}
              </button>
              {expanded === index && (
                <div className="p-4 bg-background-light dark:bg-background-dark">
                  <div className="flex justify-between items-center">
                    <p className="text-text-light dark:text-text-dark">
                      <strong>Account ID:</strong> {account.account_number}
                    </p>
                    <p className="text-text-light dark:text-text-dark">
                      <strong>Status:</strong> {account.status}
                    </p>
                    <button
                      className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:opacity-90 transition"
                      onClick={() => setUpdatingAccount(account)} 
                    >
                      Update Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <PDAForm
            account={updatingAccount} 
            onCancel={() => setUpdatingAccount(null)} 
          />
        </div>
      )}
    </div>
  );
};

export default PDAAccountsDropdown;
