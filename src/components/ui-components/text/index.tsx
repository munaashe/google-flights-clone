import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type CustomVariant = 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'body1' | 'body2' | 'label';

const Text = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'customVariant',
})<{ customVariant: CustomVariant }>(({ customVariant }) => {
    const fontSizes: Record<CustomVariant, string> = {
        title1: '2.75rem',
        title2: '2.25rem',
        title3: '1.5rem',
        title4: '1.25rem',
        title5: '1.125rem',
        body1: '1rem',
        body2: '0.875rem',
        label: '0.75rem',
    };

    return {
        fontSize: fontSizes[customVariant],
        fontWeight: ['title1', 'title2', 'title3', 'title4'].includes(customVariant) ? 700 : 500,
        textTransform: customVariant === 'label' ? 'uppercase' : 'none',
    };
});

interface TextProps extends TypographyProps {
    customVariant: CustomVariant;
}

const CustomText: React.FC<TextProps> = ({ customVariant, children, ...props }) => {
    return (
        <Text customVariant={customVariant} {...props}>
            {children}
        </Text>
    );
};

export default CustomText;