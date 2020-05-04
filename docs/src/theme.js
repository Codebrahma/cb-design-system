const defautBtnStyles = {
  m: 2,
  cursor: 'pointer',
};

export default {
  colors: {
    text: '#000',
    white: '#fff',
    primaryLight: '#4791db',
    primary: '#1976d2',
    primaryDark: '#115293',
    secondaryLight: '#e33371',
    secondary: '#dc004e',
    secondaryDark: '#9a0036',
    errorLight: '#e57373',
    error: '#f44336',
    errorDark: '#d32f2f',
    warningLight: '#ffb74d',
    warning: '#ff9800',
    warningDark: '#f57c00',
    infoLight: '#64b5f6',
    info: '#2196f3',
    infoDark: '#1976d2',
    successLight: '#81c784',
    success: '#4caf50',
    successDark: '#388e3c',
    background: 'white',
    borderGray: '#ddd',
    lightGray: '#00000080',
    darkGray: '#888',
  },

  buttons: {
    primary: {
      ...defautBtnStyles,
      bg: 'primary',
      color: 'white',
    },
    secondary: {
      ...defautBtnStyles,
      bg: 'secondary',
      color: 'white',
    },
    success: {
      ...defautBtnStyles,
      bg: 'success',
      color: 'white',
    },
    error: {
      ...defautBtnStyles,
      bg: 'error',
      color: 'white',
    },
    warning: {
      ...defautBtnStyles,
      bg: 'warning',
      color: 'white',
    },
    info: {
      ...defautBtnStyles,
      bg: 'info',
      color: 'white',
    },
  },
  placeholderVariants: {
    primary: {
      color: 'darkGray',
    },
  },
  breakpoints: ['320px', '425px', '768px', '1024px'],
  space: [0, 2, 4, 8, 16, 32, 64, 128],
  radii: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  lineHeight: [1, 1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.05],
  zIndices: [-32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32],
  fontSizes: {
    h1: '28px',
    h2: '24px',
    h3: '22px',
    h4: '20px',
    h5: '18px',
    text: '16px',
    small: '14px',
  },
  toast: {
    primary: {
      bg: 'primary',
      color: 'white',
    },
    secondary: {
      bg: 'secondary',
      color: 'white',
    },
    error: {
      bg: 'error',
      color: 'white',
    },
    warn: {
      bg: 'warn',
      color: 'white',
    },
    info: {
      bg: 'info',
      color: 'white',
    },
    success: {
      bg: 'success',
      color: 'white',
    },
  },

  pill: {
    primary: {
      container: {
        px: 3,
        py: 2,
        borderRadius: 3,
        bg: 'white',
      },
      content: {
        color: 'primary',
      },
      closeIcon: {
        height: '20px',
        width: '20px',
      },
    },
  },

  switch: {
    sm: {
      switchBody: {
        width: '30px',
        height: '15px',
        borderColor: 'borderGray',
        bg: 'borderGray',
        '&:checked': {
          borderColor: 'success',
          bg: 'success',
        },
      },
      switchHandle: {
        borderColor: 'borderGray',
        bg: 'primary',
      },
    },
  },

  forms: {
    input: {
      p: 3,
      borderColor: 'borderGray',
      borderRadius: 2,
    },
  },

  dropdownMenu: {
    primary: {
      dropdownTrigger: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'borderGray',
        borderRadius: 4,
        px: 2,
      },
      dropdownContainer: {
        width: '300px',
      },
      dropdownOption: {
        color: 'text',
        '&:hover': {
          bg: 'primaryLight',
          color: 'white',
        },
        '&:focus': {
          bg: 'primaryDark',
          color: 'white',
        },
      },
    },
  },

  tabs: {
    primary: {
      tabContainer: {
        bg: 'borderGray',
      },
      tab: {
        color: 'primaryLight',
        px: 4,
        py: 3,
      },
      tabSelected: {
        // color: 'success',
        // borderBottomWidth: '3px',
        // borderBottomStyle: 'solid',
        // borderBottomColor: 'success',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'darkGray',
        borderBottomColor: '#fff',
        marginBottom: '-1px',
        bg: '#fff',
      },
      content: {
        p: 3,
        mt: 2,
        bg: 'border',
        color: 'text',
      },
    },
  },

  styles: {
    root: {
      lineHeight: 4,
    },
    img: {
      maxWidth: '600px',
    },
    table: {
      borderCollapse: 'collapse',
      'td, th': {
        p: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'borderGray',
        textAlign: 'left',
      },
    },
  },
};
