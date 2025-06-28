import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const DashboardPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex-column gap-l">
        <HeroBanner
          icon="dashboard"
          title="Dashboard"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>
    </DefaultLayout>
  );
};

export default DashboardPage;
