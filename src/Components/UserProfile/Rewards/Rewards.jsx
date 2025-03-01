const Rewards = ({ onClose, currUser }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-background-dark dark:bg-opacity-80">
      <div className="w-full max-w-md p-6 rounded-lg text-center relative bg-white dark:bg-background-dark border border-border-light dark:border-border-dark shadow-lg dark:shadow-[0px_0px_15px_var(--tw-shadow-dark)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded transition text-black dark:text-primary-dark text-xl font-bold hover:bg-accent-dark dark:hover:bg-accent-dark"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-accent-light dark:text-accent-dark">
          Hi {currUser.name}
        </h2>

        <div className="text-center py-4 border-2 border-dashed rounded-lg border-border-light dark:border-border-dark bg-accent-light/10 dark:bg-accent-dark/10">
          <h3 className="text-2xl font-bold mb-1 text-primary-dark dark:text-primary-dark">
            🏅 Available Points
          </h3>
          <span className="text-4xl font-bold text-accent-light dark:text-accent-dark">
            {currUser.coins}
          </span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 font-medium rounded text-primary-light dark:text-primary-dark bg-accent-light dark:bg-accent-dark hover:text-primary-light dark:hover:text-primary-dark hover:opacity-90"
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default Rewards;