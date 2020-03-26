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
  breakpoints: [
    '320px', '425px', '768px', '1024px',
  ],
  space: [0, 2, 4, 8, 16, 32, 64, 128],
  radii: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  fontSizes: {
    h1: '28px',
    h2: '24px',
    h3: '22px',
    h4: '20px',
    h5: '18px',
    text: '16px',
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
        py: 1,
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

  forms: {
    input: {
      p: 3,
      borderColor: 'border',
      borderRadius: 2,
    },
  },
};
