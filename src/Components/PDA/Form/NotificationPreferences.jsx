function NotificationPreferences({ formData, setFormData }) {
  return (
    <div className="mb-4 text-text-light dark:text-text-dark">
      <h3 className="text-lg font-semibold mb-2">
        Notification Preferences
      </h3>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="email"
            checked={formData.preferences.notification_preferences.email}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                preferences: {
                  ...prevData.preferences,
                  notification_preferences: {
                    ...prevData.preferences.notification_preferences,
                    email: e.target.checked,
                  },
                },
              }))
            }
            className="mr-2 dark:text-text-dark"
          />
          Email
        </label>
      </div>
    </div>
  );
}

export default NotificationPreferences;
