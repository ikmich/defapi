const askUtil = {
  isYesInput(value: any) {
    return (
      value &&
      value.length &&
      (value === 'yes' || value === 'y' || value === '1' || value === 'yep' || value === 'yup' || value === 'yeah')
    );
  }
};

export { askUtil };
