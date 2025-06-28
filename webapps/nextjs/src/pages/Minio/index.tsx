import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const MinioPage: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex-column gap-l">
        <HeroBanner icon="terminal" title="Minio" />
      </section>
    </DefaultLayout>
  );
};

export default MinioPage;