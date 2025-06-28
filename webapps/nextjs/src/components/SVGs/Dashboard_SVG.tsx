type Props = {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string;
};

const Dashboard_SVG: React.FC<Props> = (props: Props) => {
  const { className = "", width = 24, height = 24, primaryColor = "inherit" } = props;

  return (
    <svg
      fill={"none"}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={primaryColor} strokeWidth={1} fill={"none"} fillRule="evenodd">
        <rect x={4} y={4} rx={2} width={16} height={16} strokeWidth={2} stroke={primaryColor} strokeLinecap="round" />
        <line x1={4} y1={9} x2={20} y2={9} stroke={primaryColor} strokeWidth={2} strokeLinecap="round" />
        <line x1={9} x2={9} y1={10} y2={20} strokeWidth={2} stroke={primaryColor} strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default Dashboard_SVG;
