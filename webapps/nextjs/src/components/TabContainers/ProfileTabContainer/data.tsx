import ContactsTab from "./Tabs/ContactsTab";
import NotificationsTab from "./Tabs/Notifications";

export const profileTabs: Tab[] = [
  {
    title: "Contacts",
    content: <ContactsTab />,
  },
  {
    title: "Notifications",
    content: <NotificationsTab />,
  },
];
