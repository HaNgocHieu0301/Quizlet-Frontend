export interface IconSvgProps {
  width?: number;
  height?: number;
  iconName: string;
  color?: string;
  fill?: string;
}

const IconSvg = ({
  width = 25,
  height = 25,
  iconName,
  color,
  fill,
}: IconSvgProps) => {
  return (
    <svg width={width} height={height} color={color} fill={fill}>
      <noscript></noscript>
      <use xlinkHref={`#${iconName}`}></use>
      <noscript></noscript>
    </svg>
  );
};

export default IconSvg;
