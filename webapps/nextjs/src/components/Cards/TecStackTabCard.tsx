import Link from "next/link";
import getSvg from "@/lib/getSvg";

export type TechStackTabCardData = {
  icon?: string;
  title?: string;
  content?: string;
  documentationLink?: string;
};

const TechStackTabCard: React.FC<TechStackTabCardData> = (props: TechStackTabCardData) => {
  const { title, icon, content, documentationLink } = props;

  return (
    <div className="flex-column gap-m">
      <div className="flex-row gap-s items-center">
        {icon && <>{getSvg({ icon, size: 50 })}</>}
        {title && <h3>{title}</h3>}
      </div>

      {content && <p>{content}</p>}

      {documentationLink && (
        <div className="text-right">
          <Link href={documentationLink} className="link-text">
            Documentation
          </Link>
        </div>
      )}
    </div>
  );
};

export default TechStackTabCard;
