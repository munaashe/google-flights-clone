import React from "react";
import { Tab, TabProps, styled } from "@mui/material";

interface StyledTabProps extends TabProps {
    icon?: React.ReactElement;
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab {...props} icon={props.icon} iconPosition="start" label={props.label} />
))(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '999px',
    margin: '0 8px',
    padding: '4px 12px',
    minHeight: '32px',
    minWidth: '90px',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',

    '&:hover': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
    },

    '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        textDecoration: 'none',
    },

    '& .MuiTab-iconWrapper': {
        color: theme.palette.primary.main,
        marginRight: '8px',
        display: 'flex',
        alignItems: 'center',
    },

    '& .MuiTab-root': {
        border: '1px solid',
        borderRadius: '999px',
    },
}));

export default StyledTab;