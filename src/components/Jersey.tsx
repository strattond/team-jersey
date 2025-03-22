import { useAppSelector } from "../state/hooks";

interface JerseyProps {
  shirt?: string;
  sleeve?: string;
  number?: string;
  label?: string;
  onClick?: () => void;
}

const Jersey = ({ shirt = 'red', sleeve = 'white', number = "", label = "", onClick = () => { } }: JerseyProps) => {
  const digFontSize = number.length > 2 ? 10 : 15;
  const lblFontSize = label.length > 2 ? 10 : 15;
  const multiplier = useAppSelector((state) => state.options.multiplier) / 100;

  return (
    <div style={{ width: `${50 *multiplier}px`, height: `${60 *multiplier}px` }}>
      <svg onDoubleClick={onClick} viewBox="0 0 50 60" width={50 * multiplier} height={60 * multiplier}>
        <path fill={shirt} opacity="1.000000" stroke="none" name="body"
          d="M 32.5,2.8
           L 38.0,2.8
           L 46.5,8.8
           L 43.5,16.2
           L 37.0,12.2
           L 35.0,37.5
           L 15.0,37.5
           L 13.0,12.2
           L 6.5,16.2
           L 3.5,8.8
           L 12.0,2.8
           L 16.5,2.8
           L 18.0,5.0
           C 18.0,5.0 24.5,9.0 31.0,5.0

z" />
        <path fill={sleeve} opacity="1.000000" stroke="none" name="neck"
          d="M 16.5,2.8
           L 18.0,5.0
           C 18.0,5.0 24.5,9.0 31.0,5.0
           L 32.5,2.8
           L 31.0,2.8
           C 31.0,2.8 25.5,9.0 18.0,2.8
z" />
        <path fill={sleeve} opacity="1.000000" stroke="none" name="sleeveRight"
          d="M 46.5,8.8
           L 48.0,9.8
           L 45.0,17.2
           L 43.5,16.2
z" />
        <path fill={sleeve} opacity="1.000000" stroke="none" name="sleeveLeft"
          d="M 3.5,8.8
           L 2.0,9.8
           L 5.0,17.2
           L 6.5,16.2
z" />
        {/* Jersey number */}
        <text
          x={25}
          y={25}
          textAnchor="middle"
          fontSize={digFontSize}
          fontFamily="Arial, sans-serif"
          fill="white"
        >
          {number}
        </text>
        {/* Jersey label */}
        {label.length > 0 ?
          <>
            <path fill={'#000000'} opacity="1.000000" stroke="none" name="sleeveLeft"
              d="M 3.5,42
         L  46.0,42
         L  46.0,52
         L   3.5,52
z" />
            <text
              x={25}
              y={50}
              textAnchor="middle"
              fontSize={lblFontSize}
              fontFamily="Arial, sans-serif"
              fill="white"
            >
              {label}
            </text>
          </>
          : <></>
        }

      </svg>
    </div>
  );
};

export default Jersey;
