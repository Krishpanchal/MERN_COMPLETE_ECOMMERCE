module.exports = (user, statusCode, res) => {
  // Create the token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  // Send the response
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
