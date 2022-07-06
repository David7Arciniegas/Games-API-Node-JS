const catchAsyncUtils = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { catchAsync: catchAsyncUtils };
