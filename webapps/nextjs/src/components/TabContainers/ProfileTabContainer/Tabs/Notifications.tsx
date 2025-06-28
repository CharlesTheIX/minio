import ProfileNotificationsFeed from "@/components/Feeds/ProfileNotificationFeed";

const NotificationsTab: React.FC = () => {
  return (
    <div className="flex-column gap-xl">
      <div className="flex-row gap-s items-start justify-between">
        <div className="flex-column max-width-m" style={{ marginLeft: 0 }}>
          <h3>Notifications</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>
        </div>
      </div>

      <div>
        <ProfileNotificationsFeed />
      </div>
    </div>
  );
};

export default NotificationsTab;
