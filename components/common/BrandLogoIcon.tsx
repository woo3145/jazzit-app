import { cva } from 'class-variance-authority';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const brandLogoIcon = cva([], {
  variants: {
    size: {
      sm: 'w-6 h-6',
      md: 'w-7 h-7',
      lg: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const BrandLogoIcon = ({ size = 'md' }: Props) => {
  return (
    <svg
      className={brandLogoIcon({ size })}
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path
          className="fill-current"
          d="M481.688,224.576c-16.76-21.648-39.52-38.408-65.792-47.881c-5.024-33.079-21.072-62.568-44.384-84.344
       c-25.904-24.239-60.848-39.12-99.128-39.104c-37.376-0.016-71.6,14.176-97.312,37.392c-22.44,20.24-38.544,47.44-44.96,78.192
       C57.008,176.48,0.016,238.208,0,313.344c0.016,80.304,65.096,145.392,145.408,145.408h221.184
       c80.312-0.016,145.4-65.104,145.408-145.408C512.008,279.952,500.672,249.072,481.688,224.576z M450.824,396.296
       c-20.928,20.896-49.664,33.767-81.568,33.784H142.744c-31.912-0.016-60.64-12.888-81.568-33.784
       c-20.904-20.936-33.784-49.672-33.784-81.569c-0.016-63.336,51.072-114.712,114.256-115.288l14.896-0.144l1.632-14.8
       c3.176-28.84,16.96-54.448,37.424-72.928c20.48-18.456,47.432-29.639,77.184-29.648c30.456,0.008,57.968,11.744,78.592,31.008
       c20.6,19.264,34.104,45.92,36.312,75.776l0.864,11.8l11.407,3.144c24.361,6.72,45.552,21.232,60.624,40.712
       c15.081,19.488,24.017,43.784,24.032,70.368C484.6,346.624,471.72,375.36,450.824,396.296z"
        />
        <path
          className="fill-current"
          d="M205.76,316.176c-5.24-0.816-10.88-0.568-16.512,1.208c-16.88,5.304-26.912,21.192-22.417,35.48
       c4.497,14.264,21.824,21.536,38.697,16.232c12.936-4.072,22.952-14.368,24.392-25.368v-96.944l80.2,15.248v74.048
       c-5.128-0.76-10.649-0.496-16.145,1.24c-16.871,5.32-26.912,21.208-22.416,35.464c4.488,14.288,21.816,21.552,38.696,16.248
       c13.415-4.232,23.128-15.153,24.031-26.617V226L205.76,203.848V316.176z"
        />
      </g>
    </svg>
  );
};