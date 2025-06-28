type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
  direction?: "up" | "down" | "left" | "right";
};

const Chevron_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit", direction = "down" } = props;

  switch (direction) {
    case "up":
      return (
        <svg
          fill={"none"}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeWidth={2}
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 15L12 9L18 15M12 15H12.01"
          />
        </svg>
      );
    case "down":
      return (
        <svg
          fill={"none"}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeWidth={2}
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9L12 15L18 9M12 9H12.01"
          />
        </svg>
      );
    case "left":
      return (
        <svg
          fill={"none"}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 6L9 12L15 18M15 12H15.01"
            strokeWidth={2}
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "right":
      return (
        <svg
          fill={"none"}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeWidth={2}
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6L15 12L9 18M9 12H9.01"
          />
        </svg>
      );
  }
};

export default Chevron_SVG;
