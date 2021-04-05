const askUtil = {
  isYesInput(value: any) {
    return value && value.length && (value === 'yes' || value === 'y' || value === '1');
  }
};

export { askUtil };
