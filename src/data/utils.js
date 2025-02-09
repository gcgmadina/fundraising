export const formatCurrency = (value) => {
    if (value === null || value === undefined || value == 0) {
      return '0';
    } else {
      return value.toLocaleString('id-ID');
    }
    
  }